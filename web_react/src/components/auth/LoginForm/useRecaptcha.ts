import { useState, useEffect, useRef } from 'react';
import { readTimeOut, deleteTimeOut, deleteRecaptcha } from '@app/services/localStorage.service';

/**
 * Custom hook for managing recaptcha state
 * Handles recaptcha requirement and timeout logic
 */
export const useRecaptcha = () => {
  const [requireRecaptcha, setRequireRecaptcha] = useState(false);
  const [timeOut, setTimeOut] = useState(0);
  const captchaRef = useRef<any>(null);

  useEffect(() => {
    const storedTimeOut = readTimeOut();
    const currentTime = Math.floor(Date.now() / 1000);

    if (storedTimeOut > currentTime) {
      setRequireRecaptcha(true);
      setTimeOut(storedTimeOut - currentTime);
    } else {
      setRequireRecaptcha(false);
      deleteTimeOut();
      deleteRecaptcha();
    }
  }, []);

  const resetCaptcha = () => {
    captchaRef?.current?.reset();
  };

  return {
    requireRecaptcha,
    setRequireRecaptcha,
    timeOut,
    setTimeOut,
    captchaRef,
    resetCaptcha
  };
};
