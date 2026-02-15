/**
 * Captures a frame from a video element and triggers a browser download.
 */
export const captureVideoFrame = (videoElement: HTMLVideoElement) => {
  try {
    const canvas = document.createElement('canvas');
    // Set canvas dimensions to match the actual video stream resolution
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Draw the current video frame onto the canvas
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      // Convert to PNG and trigger download
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `monkey-snap-${new Date().getTime()}.png`;
      link.href = dataURL;
      link.click();
    }
  } catch (error) {
    console.error("Failed to capture snapshot:", error);
  }
};