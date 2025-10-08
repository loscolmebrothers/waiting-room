import { Group, Layer, Rect, Text } from "react-konva";
import useWindowSize from "./useWindowSize";
import { useEffect } from "react";
import { useState } from "react";
import { useSpring, animated, to } from "@react-spring/konva";

function Intro({ finish }) {
  const { width, height } = useWindowSize();
  const [countdown, setCountdown] = useState(4);

  const AnimatedRect = animated.Rect;
  const AnimatedLayer = animated.Layer;
  const AnimatedText = animated.Text;

  const [fadeAnimation, fadeApi] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 200, friction: 20 },
  }));

  const [gradientAnimation] = useSpring(() => ({
    from: { offset: 0 },
    to: { offset: 3 },
    loop: true,
    config: { duration: 600 },
  }));

  const [quickAnimation] = useSpring(() => ({
    from: { opacity: 0, scale: 0.5 },
    to: { opacity: 1, scale: 1 },
    config: { tension: 200, friction: 20 },
  }));

  const [escapeAnimation] = useSpring(() => ({
    from: { opacity: 0, scale: 0.5 },
    to: { opacity: 1, scale: 1 },
    delay: 600,
    config: { tension: 200, friction: 20 },
  }));

  const [countdownAnimation] = useSpring(() => ({
    from: { opacity: 0, scale: 0.5 },
    to: { opacity: 1, scale: 1 },
    delay: 1000,
    config: { tension: 200, friction: 20 },
  }));

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      fadeApi.start({
        opacity: 0,
        config: { duration: 200 },
        onRest: () => finish(true),
      });
    }
  }, [countdown, finish, fadeApi]);

  const backgroundColor = to([gradientAnimation.offset], (offset) => {
    const wave = Math.sin(offset * Math.PI * 2) * 0.5 + 0.5;
    const gray = Math.floor(5 + wave * 10);
    return `rgb(${gray}, ${gray}, ${gray})`;
  });

  return (
    <AnimatedLayer
      width={width}
      height={height}
      opacity={fadeAnimation.opacity}
    >
      <AnimatedRect width={width} height={height} fill={backgroundColor} />

      <AnimatedText
        text="Quick!"
        x={0}
        y={height / 2 - 20}
        width={width}
        fontSize={32}
        fill="white"
        fontStyle="bold"
        align="center"
        opacity={quickAnimation.opacity}
        scaleX={quickAnimation.scale}
        scaleY={quickAnimation.scale}
      />

      <AnimatedText
        text="Don't let them escape"
        x={0}
        y={height / 2 + 20}
        width={width}
        fontSize={24}
        fill="white"
        fontStyle="bold"
        align="center"
        opacity={escapeAnimation.opacity}
        scaleX={escapeAnimation.scale}
        scaleY={escapeAnimation.scale}
      />
      <AnimatedText
        text={countdown}
        x={0}
        y={height / 2 + 60}
        width={width}
        fontSize={48}
        fill="white"
        fontStyle="bold"
        align="center"
        opacity={countdownAnimation.opacity}
        scaleX={countdownAnimation.scale}
        scaleY={countdownAnimation.scale}
      />
    </AnimatedLayer>
  );
}

export default Intro;
