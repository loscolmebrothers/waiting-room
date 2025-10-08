import { useEffect, useRef } from "react";
import { useSpring, to } from "@react-spring/konva";

function useIntroAnimations(countdown, finish) {
  const hasQuickTextAnimatedRef = useRef(false);

  const [layerFadeOutAnimation, layerFadeOutAnimationApi] = useSpring(() => ({
    from: { opacity: 1 },
    config: { tension: 200, friction: 20 },
  }));

  const [backgroundGreyscaleAnimation] = useSpring(() => ({
    from: { offset: 0 },
    to: { offset: 3 },
    loop: true,
    config: { duration: 600 },
  }));

  const [quickTextAnimation, quickTextAnimationApi] = useSpring(() => ({
    from: { opacity: 0, scale: 100 },
    to: [
      { opacity: 1, scale: 2 },
      { opacity: 1, scale: 1 },
    ],
    config: { tension: 200, friction: 20 },
    onStart: () => {
      hasQuickTextAnimatedRef.current = true;
    },
  }));

  const [escapeTextAnimation] = useSpring(() => ({
    from: { opacity: 0, scale: 0.6 },
    to: { opacity: 1, scale: 1 },
    delay: 1000,
    config: { tension: 200, friction: 20 },
  }));

  const [countdownTextAnimation] = useSpring(() => ({
    from: { opacity: 0, scale: 0.5 },
    to: { opacity: 1, scale: 1 },
    delay: 2000,
    config: { tension: 200, friction: 20 },
  }));

  useEffect(() => {
    if (hasQuickTextAnimatedRef.current) {
      quickTextAnimationApi.stop();
    }
  }, [countdown, quickTextAnimationApi]);

  useEffect(() => {
    if (countdown === 0) {
      layerFadeOutAnimationApi.start({
        opacity: 0,
        config: { duration: 150 },
        onRest: () => finish(true),
      });
    }
  }, [countdown, finish, layerFadeOutAnimationApi]);

  const greyscaleBackgroundColor = to(
    [backgroundGreyscaleAnimation.offset],
    (offset) => {
      const wave = Math.sin(offset * Math.PI * 2) * 0.5 + 0.5;
      const gray = Math.floor(5 + wave * 5);
      return `rgb(${gray}, ${gray}, ${gray})`;
    },
  );

  return {
    layerFadeOutAnimation,
    greyscaleBackgroundColor,
    quickTextAnimation,
    escapeTextAnimation,
    countdownTextAnimation,
  };
}

export default useIntroAnimations;
