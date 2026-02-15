import { useState } from 'react';

export const useCameraFlip = (localStream: MediaStream | null) => {
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  const toggleCamera = async (onStreamUpdate: (newStream: MediaStream) => void) => {
    const newMode = facingMode === 'user' ? 'environment' : 'user';
    
    try {
      // Stop current tracks to release the camera
      localStream?.getTracks().forEach(track => track.stop());

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: newMode },
        audio: true
      });

      setFacingMode(newMode);
      onStreamUpdate(newStream);
    } catch (err) {
      console.error("Error flipping camera:", err);
    }
  };

  return { facingMode, toggleCamera };
};