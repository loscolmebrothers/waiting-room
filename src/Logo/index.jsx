import { useState, useEffect } from "react";
import { Layer, Group, Text } from "react-konva";
import { useSpring, animated } from "@react-spring/konva";
import random from "random";

import useLogoSlices from "./useLogoSlices";

function FloatingText({
  width = 500,
  height = 500,
  x = 0,
  y = 0,
  delay = 0,
  ...props
}) {
  const [target, setTarget] = useState({ x, y });
  const { Image } = animated;
  const animation = useSpring({
    to: { x: target.x, y: target.y, scaleX: 1, scaleY: 1 },
    onRest: () => {
      setTarget({
        x: x + random.float(-1, 1) * width,
        y: y + random.float(-1, 1) * height,
      });
    },
    config: {
      tension: 200,
      friction: 18,
    },
    delay,
  });

  useEffect(() => {
    setTarget({
      x: x + random.float(-1, 1) * width,
      y: y + random.float(-1, 1) * height,
    });
  }, [x, y, width, height]);

  return <Image {...animation} {...props} />;
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
          width={width}
          height={height}
          delay={random.float(0, 1000)}
          image={LOS}
          y={-((verticalGap * 3) / 2)}
          offsetX={LOS.width / 2}
          offsetY={LOS.height / 2}
        />
        <FloatingText
          width={width}
          height={height}
          delay={random.float(0, 1000)}
          image={COLME}
          offsetX={COLME.width / 2}
          offsetY={COLME.height / 2}
        />
        <FloatingText
          width={width}
          height={height}
          delay={random.float(0, 1000)}
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
