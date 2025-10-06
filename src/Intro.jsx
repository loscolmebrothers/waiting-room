import { Layer, Rect, Text } from "react-konva";
import useWindowSize from "./useWindowSize";

function Intro({ countdown }) {
  const { width, height } = useWindowSize();

  const instructionWidth = 300;
  const countdownWidth = 40;

  return (
    <Layer width={width} height={height}>
      <Rect width={width} height={height} fill="red" />
      <Text
        text={"Quick! Don't let them escape"}
        x={(width - instructionWidth) / 2}
        y={height / 2 - 50}
        fontSize={22}
        fill="white"
      />
      <Text
        text={countdown}
        x={(width - countdownWidth) / 2}
        y={height / 2}
        fontSize={48}
        fill="white"
        fontStyle="bold"
      />
    </Layer>
  );
}

export default Intro;
