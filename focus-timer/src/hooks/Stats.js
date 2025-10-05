import React, { useEffect, useState } from "react";

const Stats = () => {
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
    const data = JSON.parse(localStorage.getItem("sessions")) || {};
    setSessions(data[today] || 0);
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Today's Completed Focus Sessions: {sessions}</h3>
    </div>
  );
};

export default Stats;
