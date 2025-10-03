import { Layer, Image, Group, Text } from "react-konva";
import { useSpring, animated } from "@react-spring/konva";
import random from "random";

import useLogoSlices from "./useLogoSlices";

function FloatingText({ delay, duration, x = 0, y = 0, ...props }) {
  const animation = useSpring({
    from: { x, y, scaleX: 1, scaleY: 1 },
    to: [
      { x, y: y - random.float(2, 3), scaleX: 1.05, scaleY: 1.05 },
      { x: x + random.float(8, 15), y, scaleX: 0.95, scaleY: 0.95 },
      { x, y: y + random.float(2, 3), scaleX: 1.05, scaleY: 1.05 },
      { x: x - random.float(8, 15), y, scaleX: 0.95, scaleY: 0.95 },
      { x, y, scaleX: 1, scaleY: 1 },
    ],
    config: { duration },
    loop: true,
    delay,
  });

  return <animated.Image {...props} {...animation} />;
}

function Logo({ width, height }) {
  const { isLoading: isLogoLoading, slices } = useLogoSlices();

  if (isLogoLoading)
    return (
      <Layer>
        <Text text="Loading" />
      </Layer>
    );

  const verticalGap = 65;
  const { LOS, COLME, BROTHERS } = slices;

  return (
    <Layer x={width} y={height} offsetX={width} offsetY={height}>
      <Group x={width} y={height - verticalGap}>
        <FloatingText
          duration={random.int(2000, 4000)}
          image={LOS}
          y={-((verticalGap * 3) / 2)}
          offsetX={LOS.width / 2}
          offsetY={LOS.height / 2}
        />
        <FloatingText
          delay={800}
          duration={random.int(2000, 4000)}
          image={COLME}
          offsetX={COLME.width / 2}
          offsetY={COLME.height / 2}
        />
        <FloatingText
          delay={1500}
          duration={random.int(2000, 4000)}
          image={BROTHERS}
          y={(verticalGap * 24) / 13}
          offsetX={BROTHERS.width / 2}
          offsetY={BROTHERS.height / 2}
        />
      </Group>
    </Layer>
  );
}

export default Logo;
