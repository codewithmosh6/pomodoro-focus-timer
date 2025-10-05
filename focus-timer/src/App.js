import React, { useState, useEffect } from "react";
import "./App.css";
import TimerWithProgress from "./components/TimerWithProgress";
import useNotificationSound from "./hooks/useNotificationSound";
import { useTheme } from "./hooks/useTheme";

function App() {
  // Timer durations (in minutes)
  const focusDuration = 25;
  const breakDuration = 5;

  // Theme state
  const [theme, toggleTheme] = useTheme();

  // Timer state
  const [isFocusMode, setIsFocusMode] = useState(true);
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Notification sound
  const playSound = useNotificationSound();

  // Timer countdown effect
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      // Play notification sound
      playSound();

      // Switch mode automatically
      setIsFocusMode((prev) => !prev);
      setTimeLeft(isFocusMode ? breakDuration * 60 : focusDuration * 60);
      setIsRunning(false); // stop timer after switching
    }

    return () => clearInterval(timer);
  }, [
    isRunning,
    timeLeft,
    isFocusMode,
    focusDuration,
    breakDuration,
    playSound,
  ]);

  // Control handlers
  const toggleTimer = () => setIsRunning((r) => !r);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isFocusMode ? focusDuration * 60 : breakDuration * 60);
  };
  const switchMode = () => {
    setIsFocusMode((prev) => !prev);
    setTimeLeft(isFocusMode ? breakDuration * 60 : focusDuration * 60);
    setIsRunning(false);
  };

  return (
    <div className={`app-container ${isFocusMode ? "focus" : "break"}`}>
      <h1 className="title">Focus Timer</h1>

      {/* Theme toggle */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </button>
      </div>

      <p className="mode">{isFocusMode ? "Focus Mode" : "Break Mode"}</p>

      {/* Timer with Circular Progress Bar */}
      <TimerWithProgress
        timeLeft={timeLeft}
        totalTime={isFocusMode ? focusDuration * 60 : breakDuration * 60}
        isFocusMode={isFocusMode}
      />

      {/* Controls */}
      <div className="controls">
        <button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</button>
        <button onClick={resetTimer}>Reset</button>
        <button onClick={switchMode}>Switch Mode</button>
      </div>
    </div>
  );
}

export default App;
