import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const TimerWithProgress = ({ timeLeft, totalTime, isFocusMode }) => {
  const percentage = (timeLeft / totalTime) * 100;

  return (
    <div style={{ width: 200, height: 200 }}>
      <CircularProgressbar
        value={percentage}
        text={`${Math.floor(timeLeft / 60)
          .toString()
          .padStart(2, "0")}:${(timeLeft % 60).toString().padStart(2, "0")}`}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: isFocusMode ? "#ef4444" : "#10b981",
          trailColor: "rgba(255,255,255,0.3)",
        })}
      />
    </div>
  );
};

export default TimerWithProgress;
