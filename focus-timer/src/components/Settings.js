import React from "react";

const Settings = ({ autoStart, setAutoStart }) => {
  return (
    <div style={{ margin: "20px 0" }}>
      <label>
        Auto Start Next Session:
        <input
          type="checkbox"
          checked={autoStart}
          onChange={(e) => {
            setAutoStart(e.target.checked);
            localStorage.setItem("autoStart", JSON.stringify(e.target.checked));
          }}
          style={{ marginLeft: "8px" }}
        />
      </label>
    </div>
  );
};

export default Settings;
