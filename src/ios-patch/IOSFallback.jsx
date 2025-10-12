import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./IOSFallback.css";

function IOSFallback() {
  const logoRef = useRef(null);
  const { t } = useTranslation();

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
        <h1 className="ios-fallback-title">{t("iosFallback.title")}</h1>
        <p className="ios-fallback-message">{t("iosFallback.message")}</p>
        <p className="ios-fallback-submessage">{t("iosFallback.submessage")}</p>
        <ul className="ios-fallback-alternatives">
          <li>{t("iosFallback.alternatives.computer")}</li>
          <li>{t("iosFallback.alternatives.android")}</li>
        </ul>
        <p className="ios-fallback-footer">{t("iosFallback.footer")}</p>
      </div>
      <img
        ref={logoRef}
        src="https://assets.loscolmebrothers.com/logo/landscape/vector.svg"
        alt="Los Colme Brothers"
        className="ios-fallback-logo"
      />
    </div>
  );
}

export default IOSFallback;
