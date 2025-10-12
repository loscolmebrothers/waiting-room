import { useEffect, useRef } from "react";
import "./IOSFallback.css";

function IOSFallback() {
  const logoRef = useRef(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    let currentY = 0;
    let targetY = 0;
    let animationFrame;

    const float = () => {
      if (Math.random() < 0.02) {
        targetY = (Math.random() - 0.5) * 30;
      }

      currentY += (targetY - currentY) * 0.05;

      logo.style.transform = `translateY(${currentY}px)`;
      animationFrame = requestAnimationFrame(float);
    };

    float();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="ios-fallback">
      <div className="ios-fallback-content">
        <h1 className="ios-fallback-title">Oops, our bad!</h1>
        <p className="ios-fallback-message">
          Looks like we've got a little issue with iOS devices right now. The
          app tends to crash, and we're definitely not proud of that.
        </p>
        <p className="ios-fallback-submessage">
          We're on it though! While we fix this, mind trying from:
        </p>
        <ul className="ios-fallback-alternatives">
          <li>Your computer</li>
          <li>An Android phone</li>
        </ul>
        <p className="ios-fallback-footer">Thanks for sticking with us!</p>
      </div>
      <img
        ref={logoRef}
        src="https://assets.loscolmebrothers.com/logo/landscape/vector.svg"
        alt="LOS COLMEBROTHERS landscape logo"
        className="ios-fallback-logo"
      />
    </div>
  );
}

export default IOSFallback;
