import { useState, useEffect, useRef, useCallback } from 'react';
import { socket } from '../services/socket'; // Your socket instance
import type { ChatStatus } from '../features/videochat/types';

export const useWebRTC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [status, setStatus] = useState<ChatStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const pc = useRef<RTCPeerConnection | null>(null);

  const startCamera = async (): Promise<MediaStream | null> => {
    setStatus('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      setLocalStream(stream);
      return stream;
    } catch (err) {
      setError('Camera Access Denied');
      setStatus('error');
      return null;
    }
  };

  const cleanup = useCallback(() => {
    if (pc.current) {
      pc.current.close();
      pc.current = null;
    }
    setRemoteStream(null);
  }, []);

  const startSearching = useCallback(async () => {
    let currentStream = localStream;
    if (!currentStream) {
      currentStream = await startCamera();
      if (!currentStream) return;
    }

    cleanup();
    setStatus('searching');
    socket.emit('find-stranger');
  }, [localStream, cleanup]);

  // Handle Match Found
  useEffect(() => {
    const handleMatch = async () => {
      setStatus('connected');
      pc.current = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      // Add local tracks
      localStream?.getTracks().forEach(track => {
        if (localStream && pc.current) pc.current.addTrack(track, localStream);
      });

      // Listen for remote tracks
      pc.current.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
      };

      // Mocking match behavior for UI development
      if (!remoteStream) {
        setRemoteStream(new MediaStream());
      }
    };

    socket.on('match-found', handleMatch);
    socket.on('stranger-disconnected', () => {
      setStatus('disconnected');
      cleanup();
      setTimeout(() => startSearching(), 1500);
    });

    return () => {
      socket.off('match-found');
      socket.off('stranger-disconnected');
    };
  }, [localStream, startSearching, cleanup, remoteStream]);

  return { localStream, remoteStream, status, error, startSearching, cleanup };
};