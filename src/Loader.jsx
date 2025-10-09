import { Layer, Text } from "react-konva";
import { useSpring, animated } from "@react-spring/konva";
import useWindowSize from "./useWindowSize";

function Loader() {
  const { width, height } = useWindowSize();
  const { Text: AnimatedText } = animated;

  const dot1Animation = useSpring({
    from: { opacity: 0.3 },
    to: { opacity: 1 },
    config: { duration: 600 },
    loop: { reverse: true },
  });

  const dot2Animation = useSpring({
    from: { opacity: 0.3 },
    to: { opacity: 1 },
    config: { duration: 600 },
    delay: 200,
    loop: { reverse: true },
  });

  const dot3Animation = useSpring({
    from: { opacity: 0.3 },
    to: { opacity: 1 },
    config: { duration: 600 },
    delay: 400,
    loop: { reverse: true },
  });

  return (
    <Layer>
      <AnimatedText
        x={width / 2 - 15}
        y={height / 2}
        text="•"
        fontSize={40}
        fontFamily="Arial, sans-serif"
        fill="rgba(0, 0, 0, 0.8)"
        opacity={dot1Animation.opacity}
      />
      <AnimatedText
        x={width / 2}
        y={height / 2}
        text="•"
        fontSize={40}
        fontFamily="Arial, sans-serif"
        fill="rgba(0, 0, 0, 0.8)"
        opacity={dot2Animation.opacity}
      />
      <AnimatedText
        x={width / 2 + 15}
        y={height / 2}
        text="•"
        fontSize={40}
        fontFamily="Arial, sans-serif"
        fill="rgba(0, 0, 0, 0.8)"
        opacity={dot3Animation.opacity}
      />
    </Layer>
  );
}

export default Loader;
