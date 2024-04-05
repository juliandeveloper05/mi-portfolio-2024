import React, { useEffect, useState } from "react";

const DigitalClock = ({ initialTime }: { initialTime: Date }) => {
  const [time, setTime] = useState(new Date(initialTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number) => {
    return time.toString().padStart(2, "0");
  };

  const hours = time ? formatTime(time.getHours()) : "00";
  const minutes = time ? formatTime(time.getMinutes()) : "00";
  const seconds = time ? formatTime(time.getSeconds()) : "00";

  return (
    <div className="clock-container">
      <div className="clock">
        <div className="time">
          <span>{hours}</span>
          <span className="separator">:</span>
          <span>{minutes}</span>
          <span className="separator">:</span>
          <span>{seconds}</span>
        </div>
      </div>
    </div>
  );
};

DigitalClock.getInitialProps = () => {
  const initialTime = Date.now();
  return { initialTime };
};

export default DigitalClock;
