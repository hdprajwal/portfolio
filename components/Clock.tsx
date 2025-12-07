'use client';

import { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState<string>('--:--:--');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}
