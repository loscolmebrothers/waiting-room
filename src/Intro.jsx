import { Group, Layer, Rect, Text } from "react-konva";
import useWindowSize from "./useWindowSize";
import { useEffect, useRef, useState } from "react";
import { animated } from "@react-spring/konva";
import useIntroAnimations from "./useIntroAnimations";

function Intro({ finish }) {
  const { width, height } = useWindowSize();
  const [countdown, setCountdown] = useState(5);

  const quickTextRef = useRef();
  const escapeTextRef = useRef();
  const countdownTextRef = useRef();

  const {
    layerFadeOutAnimation,
    greyscaleBackgroundColor,
    quickTextAnimation,
    escapeTextAnimation,
    countdownTextAnimation,
  } = useIntroAnimations(countdown, finish);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

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
        y={height / 2 - 40}
        opacity={quickTextAnimation.opacity}
        scaleX={quickTextAnimation.scale}
        scaleY={quickTextAnimation.scale}
      >
        <Text
          ref={quickTextRef}
          text="Quick!"
          x={0}
          y={0}
          fontSize={32}
          fill="white"
          offsetX={quickTextRef.current?.width() / 2 || 0}
          offsetY={quickTextRef.current?.height() / 2 || 0}
        />
      </AnimatedGroup>

      <AnimatedGroup
        x={width / 2}
        y={height / 2}
        opacity={escapeTextAnimation.opacity}
        scaleX={escapeTextAnimation.scale}
        scaleY={escapeTextAnimation.scale}
      >
        <Text
          ref={escapeTextRef}
          text="Don't let them escape"
          x={0}
          y={0}
          fontSize={20}
          fill="white"
          offsetX={escapeTextRef.current?.width() / 2 || 0}
          offsetY={escapeTextRef.current?.height() / 2 || 0}
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
          ref={countdownTextRef}
          text={countdown}
          x={0}
          y={0}
          fontSize={62}
          fill="white"
          fontStyle="bold"
          offsetX={countdownTextRef.current?.width() / 2 || 0}
          offsetY={countdownTextRef.current?.height() / 2 || 0}
        />
      </AnimatedGroup>
    </AnimatedLayer>
  );
}

export default Intro;
