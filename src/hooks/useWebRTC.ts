import { useEffect, useRef, useCallback } from 'react';
import { socket } from '../services/socket'; // Ensure this points to your socket service
import { useAppDispatch } from '../app/hook'; // Or wherever your typed hook is
import { setConnected } from '../features/videochat/videoSlice';

const rtcConfig = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' }, // Free Google STUN server
  ],
};

export const useWebRTC = (localStream: MediaStream | null, setRemoteStream: (stream: MediaStream) => void) => {
  const dispatch = useAppDispatch();
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  // --- Core Function: Create the Connection Object ---
  const createPeerConnection = useCallback(() => {
    // If a connection already exists, close it first (for "Next" functionality)
    if (peerConnection.current) {
      peerConnection.current.close();
    }

    const pc = new RTCPeerConnection(rtcConfig);
    peerConnection.current = pc;

    // 1. Handle ICE Candidates (Network Info)
    // When the browser finds a network path, send it to the stranger
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', event.candidate);
      }
    };

    // 2. Handle Incoming Remote Stream
    // When the stranger's video arrives, update the UI
    pc.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
      }
    };

    // 3. Add Local Stream to Connection
    // Send your video to the stranger
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });
    }

    return pc;
  }, [localStream, setRemoteStream]);

  // --- Socket Event Listeners ---
  useEffect(() => {
    // A. Handle "Offer" (You are the Receiver)
    socket.on('offer', async (offer) => {
      const pc = createPeerConnection();
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      
      socket.emit('answer', answer);
      dispatch(setConnected(socket.id!)); // Update Redux state
    });

    // B. Handle "Answer" (You are the Caller)
    socket.on('answer', async (answer) => {
      if (peerConnection.current) {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
        dispatch(setConnected(socket.id!));
      }
    });

    // C. Handle "ICE Candidate" (Connectivity)
    socket.on('ice-candidate', async (candidate) => {
      if (peerConnection.current) {
        try {
          await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (e) {
          console.error("Error adding received ice candidate", e);
        }
      }
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off('offer');
      socket.off('answer');
      socket.off('ice-candidate');
    };
  }, [createPeerConnection, dispatch]);

  // --- Function to initiate a call (The "Caller") ---
  const startCall = async () => {
    const pc = createPeerConnection();
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit('offer', offer);
  };

  return { startCall, peerConnection };
};