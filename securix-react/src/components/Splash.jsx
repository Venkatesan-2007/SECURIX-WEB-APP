import React, { useState } from "react";

export default function Splash() {
  const [visible, setVisible] = useState(true);
  const [opened, setOpened] = useState(false);

  function authenticate() {
    setOpened(true);
    // simulate short animation then hide
    setTimeout(() => {
      setVisible(false);
    }, 1100);
  }

  if (!visible) return null;

  return (
    <div id="splashScreen" style={{ opacity: opened ? 0.95 : 1 }}>
      <div id="secixLogo">SECURIX</div>
      <div id="digitalProtection">ADVANCED DIGITAL PROTECTION</div>
      <div id="authButton" className={opened ? "open" : ""} onClick={authenticate}>
        <i id="lockIcon" className={`fas ${opened ? "fa-lock-open" : "fa-lock"}`}></i>
      </div>
      <div id="authButtonText">{opened ? "ACCESS GRANTED" : "CLICK TO AUTHENTICATE"}</div>
      <div id="splashFooter">SYSTEM SECURE • ENCRYPTED CONNECTION</div>
    </div>
  );
}
