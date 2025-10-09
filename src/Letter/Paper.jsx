import { Group, Rect, Text } from "react-konva";
import useImage from "use-image";

import useWindowSize from "../useWindowSize";
import { visibleCardGap, paperHeight } from "./constants";

function Paper() {
  const { width, height } = useWindowSize();
  const [textureImage] = useImage(
    "https://assets.loscolmebrothers.com/paper-texture.jpg",
  );

  const paperWidth = Math.min(580, width - 40);

  const paperX = (width - paperWidth) / 2;
  const paperY = height - visibleCardGap - 15;

  return (
    <Group
      x={paperX + paperWidth / 2}
      y={paperY + paperHeight / 2}
      offsetX={paperWidth / 2}
      offsetY={paperHeight / 2}
    >
      <Rect
        x={0}
        y={0}
        width={paperWidth}
        height={paperHeight * 4}
        fill="white"
        cornerRadius={6}
        shadowColor="rgba(0, 0, 0, 0.15)"
        shadowBlur={10}
        shadowOffsetX={0}
        shadowOffsetY={2}
      />
      <Rect
        x={0}
        y={0}
        width={paperWidth}
        height={paperHeight * 4}
        fillPatternImage={textureImage}
        fillPatternRepeat="repeat"
        fillPatternScale={{ x: 0.3, y: 0.3 }}
        opacity={0.4}
        cornerRadius={6}
      />

      <Text
        x={0}
        y={50}
        text={"This site is under construction. Stay tuned!"}
        fontSize={16}
        fontFamily="ApfelGrotezk"
        fill="black"
        opacity={0.6}
        align="center"
        verticalAlign="middle"
        width={paperWidth}
      />
    </Group>
  );
}

export default Paper;
