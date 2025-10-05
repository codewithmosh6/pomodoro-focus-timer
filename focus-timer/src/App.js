import React, { useState, useEffect } from "react";
import "./App.css";
import TimerWithProgress from "./components/TimerWithProgress";
import Stats from "./components/Stats";
import Settings from "./components/Settings";
import useNotificationSound from "./hooks/useNotificationSound";
import { useTheme } from "./hooks/useTheme";

function App() {
  // Timer durations (minutes)
  const focusDuration = 25;
  const breakDuration = 5;

  // Theme
  const [theme, toggleTheme] = useTheme();

  // Timer state
  const [isFocusMode, setIsFocusMode] = useState(true);
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Auto-start toggle
  const [autoStart, setAutoStart] = useState(
    JSON.parse(localStorage.getItem("autoStart")) ?? true
  );

  // Notification sound
  const playSound = useNotificationSound();

  // Increment completed focus session
  const incrementSession = () => {
    const today = new Date().toISOString().slice(0, 10);
    const data = JSON.parse(localStorage.getItem("sessions")) || {};
    data[today] = (data[today] || 0) + 1;
    localStorage.setItem("sessions", JSON.stringify(data));
  };

  // Timer countdown effect with auto-switch
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      // Play notification sound
      playSound();

      // Increment session if focus session completed
      if (isFocusMode) incrementSession();

      // Display mode switch message
      alert(isFocusMode ? "Break Time! 🎉" : "Focus Time! 💪");

      // Switch mode
      setIsFocusMode((prev) => !prev);
      setTimeLeft(isFocusMode ? breakDuration * 60 : focusDuration * 60);

      // Auto-start next session if enabled
      setIsRunning(autoStart);
    }

    return () => clearInterval(timer);
  }, [
    isRunning,
    timeLeft,
    isFocusMode,
    focusDuration,
    breakDuration,
    playSound,
    autoStart,
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

      {/* Settings */}
      <Settings autoStart={autoStart} setAutoStart={setAutoStart} />

      <p className="mode">{isFocusMode ? "Focus Mode" : "Break Mode"}</p>

      {/* Timer */}
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

      {/* Daily Stats */}
      <Stats />
    </div>
  );
}

export default App;
