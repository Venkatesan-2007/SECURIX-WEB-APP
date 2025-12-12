import React, { useEffect, useState } from "react";

export default function CurrentTime() {
  const [now, setNow] = useState(new Date().toUTCString());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date().toUTCString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return <span id="currentTime">{now}</span>;
}
