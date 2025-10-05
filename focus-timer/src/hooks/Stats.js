import React, { useEffect, useState } from "react";

const Stats = ({ className }) => {
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const data = JSON.parse(localStorage.getItem("sessions")) || {};
    setSessions(data[today] || 0);
  }, []);

  return (
    <div className={className ? className : ""} style={{ marginTop: "20px" }}>
      <h3>Today's Completed Focus Sessions: {sessions}</h3>
    </div>
  );
};

export default Stats;
