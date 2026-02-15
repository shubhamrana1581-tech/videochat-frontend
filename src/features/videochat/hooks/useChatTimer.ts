import { useState, useEffect, useCallback } from 'react';

export const useChatTimer = (initialTime: number, onTimeout: () => void) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
   let interval: ReturnType<typeof setInterval>;


    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      onTimeout();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onTimeout]);

  const startTimer = useCallback(() => {
    setTimeLeft(initialTime);
    setIsActive(true);
  }, [initialTime]);

  const addTime = useCallback((seconds: number) => {
    setTimeLeft((prev) => prev + seconds);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(initialTime);
  }, [initialTime]);

  return { timeLeft, startTimer, addTime, resetTimer, isActive };
};