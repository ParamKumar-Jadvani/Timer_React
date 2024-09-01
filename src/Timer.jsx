import React, { useState, useEffect } from "react";
import "./Timer.css";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (running) {
      intervalId = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds >= 60) {
            setMinutes((minutes) => {
              if (minutes >= 60) {
                setHours((hours) => hours + 1);
                return 0;
              } else {
                return minutes + 1;
              }
            });
            return 0;
          } else {
            return seconds + 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [running]);

  const startTimer = () => {
    setRunning(true);
  };

  const stopTimer = () => {
    setRunning(false);
  };

  const resetTimer = () => {
    setRunning(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  const formatTime = () => {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const pad = (num) => {
    return `0${num}`.slice(-2);
  };

  return (
    <div className="timer-container">
      <h1 className="timer-display">{formatTime()}</h1>
      <div className="button-group">
        <button className="start-button" onClick={startTimer}>
          Start
        </button>
        <button className="stop-button" onClick={stopTimer}>
          Stop
        </button>
        <button className="reset-button" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
