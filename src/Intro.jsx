import { Group, Layer, Rect, Text } from "react-konva";
import useWindowSize from "./useWindowSize";
import { useEffect, useRef, useState } from "react";
import { useSpring, animated, to } from "@react-spring/konva";

function Intro({ finish }) {
  const { width, height } = useWindowSize();
  const [countdown, setCountdown] = useState(5);

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

  const hasQuickTextAnimatedRef = useRef(false);

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

  useEffect(() => {
    if (hasQuickTextAnimatedRef.current) {
      quickTextAnimationApi.stop();
    }
  }, [countdown, quickTextAnimationApi]);

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
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      layerFadeOutAnimationApi.start({
        opacity: 0,
        config: { duration: 100 },
        onRest: () => finish(true),
      });
    }
  }, [countdown, finish, layerFadeOutAnimationApi]);

  const greyscaleBackgroundColor = to(
    [backgroundGreyscaleAnimation.offset],
    (offset) => {
      const wave = Math.sin(offset * Math.PI * 2) * 0.5 + 0.5;
      const gray = Math.floor(5 + wave * 10);
      return `rgb(${gray}, ${gray}, ${gray})`;
    },
  );

  const AnimatedLayer = animated.Layer;
  const AnimatedRect = animated.Rect;
  const AnimatedGroup = animated.Group;

  return (
    <AnimatedLayer
      width={width}
      height={height}
      opacity={layerFadeOutAnimation.opacity}
    >
      <AnimatedRect
        width={width}
        height={height}
        fill={greyscaleBackgroundColor}
      />

      <AnimatedGroup
        x={width / 2}
        y={height / 2 - 20}
        opacity={quickTextAnimation.opacity}
        scaleX={quickTextAnimation.scale}
        scaleY={quickTextAnimation.scale}
      >
        <Text
          text="Quick!"
          x={0}
          y={0}
          fontSize={32}
          fill="white"
          offsetX={50}
          offsetY={16}
        />
      </AnimatedGroup>

      <AnimatedGroup
        x={width / 2}
        y={height / 2 + 20}
        opacity={escapeTextAnimation.opacity}
        scaleX={escapeTextAnimation.scale}
        scaleY={escapeTextAnimation.scale}
      >
        <Text
          text="Don't let them escape"
          x={0}
          y={0}
          fontSize={24}
          fill="white"
          offsetX={165}
          offsetY={12}
        />
      </AnimatedGroup>

      <AnimatedGroup
        x={width / 2}
        y={height / 2 + 60}
        opacity={countdownTextAnimation.opacity}
        scaleX={countdownTextAnimation.scale}
        scaleY={countdownTextAnimation.scale}
      >
        <Text
          text={countdown}
          x={0}
          y={0}
          fontSize={48}
          fill="white"
          fontStyle="bold"
          offsetX={15}
          offsetY={24}
        />
      </AnimatedGroup>
    </AnimatedLayer>
  );
}

export default Intro;
