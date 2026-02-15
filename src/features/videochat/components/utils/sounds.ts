const matchSound = new Audio('/sounds/match.mp3'); // Ensure you add this file to public/sounds/

export const playMatchSound = () => {
  matchSound.currentTime = 0;
  matchSound.volume = 0.5;
  matchSound.play().catch(e => console.log("Audio play blocked by browser"));
};