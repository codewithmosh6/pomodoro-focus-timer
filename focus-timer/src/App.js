import React, { useState, useEffect } from "react";
import "./App.css";
import TimerWithProgress from "./components/TimerWithProgress";


function App() {
  const FOCUS_TIME = 25 * 60; // 25 minutes
  const BREAK_TIME = 5 * 60; // 5 minutes

  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(true);

  // Handle countdown timer logic
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      // Auto switch when timer ends
      setIsFocusMode((prev) => !prev);
      setTimeLeft(isFocusMode ? BREAK_TIME : FOCUS_TIME);
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isFocusMode]);

  const toggleTimer = () => setIsRunning((r) => !r);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isFocusMode ? FOCUS_TIME : BREAK_TIME);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`app-container ${isFocusMode ? "focus" : "break"}`}>
      <h1 className="title">Focus Timer</h1>
      <p className="mode">{isFocusMode ? "Focus Mode" : "Break Mode"}</p>

      <TimerWithProgress
        timeLeft={timeLeft}
        totalTime={isFocusMode ? focusDuration * 60 : breakDuration * 60}
        isFocusMode={isFocusMode}
      />

      <div className="controls">
        <button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</button>
        <button onClick={resetTimer}>Reset</button>
        <button onClick={() => setIsFocusMode((m) => !m)}>Switch Mode</button>
      </div>
    </div>
  );
}

export default App;
