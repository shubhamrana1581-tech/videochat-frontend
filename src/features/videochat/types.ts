export type ChatStatus = 'idle' | 'requesting' | 'searching' | 'connected' | 'disconnected' | 'error';

export interface SocketEvents {
  'find-stranger': () => void;
  'match-found': (data: { partnerId: string }) => void;
  'offer': (data: { sdp: RTCSessionDescriptionInit }) => void;
  'answer': (data: { sdp: RTCSessionDescriptionInit }) => void;
  'ice-candidate': (data: RTCIceCandidate) => void;
  'stranger-disconnected': () => void;
}