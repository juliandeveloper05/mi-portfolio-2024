import React, { useState, useEffect } from "react";

const DigitalClock = ({ initialTime }: { initialTime: Date }) => {
  const [currentTime, setCurrentTime] = useState(new Date(initialTime));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time: number) => {
    return time.toString().padStart(2, "0");
  };

  const hours = currentTime ? formatTime(currentTime.getHours()) : "00";
  const minutes = currentTime ? formatTime(currentTime.getMinutes()) : "00";
  const seconds = currentTime ? formatTime(currentTime.getSeconds()) : "00";

  return (
    <div className="clock-container">
      <div className="clock">
        <div className="time">
          <span>{isClient ? hours : "00"}</span>
          <span className="separator">:</span>
          <span>{isClient ? minutes : "00"}</span>
          <span className="separator">:</span>
          <span>{isClient ? seconds : "00"}</span>
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;
