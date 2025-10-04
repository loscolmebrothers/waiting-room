import { useEffect, useRef } from "react";
import { Layer, Group, Image, Text } from "react-konva";
import { useSpring, animated } from "@react-spring/konva";
import random from "random";

import useLogoSlices from "./useLogoSlices";

function EscapingSlice({
  width = 0,
  height = 0,
  x = 0,
  y = 0,
  delay = 0,
  ...props
}) {
  const { Image: AnimatedImage } = animated;

  const isDraggingRef = useRef(false);

  const [animation, api] = useSpring(() => ({
    from: { x, y },
    config: {
      tension: 200,
      friction: 18,
    },
  }));

  function escape(origin) {
    if (isDraggingRef.current) return;

    const speed = 0.25;

    const destination = {
      x: origin.x + random.float(-1, 1) * width * speed,
      y: origin.y + random.float(-1, 1) * height * speed,
    };

    api.start({
      from: origin,
      to: destination,
      onRest: () => {
        if (!isDraggingRef.current) {
          escape(destination);
        }
      },
    });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      escape({ x, y });
    }, delay);

    return () => clearTimeout(timer);
  }, [x, y, delay]);

  const handleDragStart = () => {
    isDraggingRef.current = true;
    api.stop();
  };

  const handleDragEnd = (event) => {
    const dropPosition = {
      x: event.target.x(),
      y: event.target.y(),
    };

    isDraggingRef.current = false;

    escape(dropPosition);
  };

  return (
    <AnimatedImage
      {...animation}
      {...props}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    />
  );
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
    <>
      <Layer x={width} y={height} offsetX={width} offsetY={height}>
        <Group x={width} y={height - verticalGap} opacity={0.1}>
          <Image
            image={LOS}
            y={-((verticalGap * 3) / 2)}
            offsetX={LOS.width / 2}
            offsetY={LOS.height / 2}
          />
          <Image
            image={COLME}
            offsetX={COLME.width / 2}
            offsetY={COLME.height / 2}
          />
          <Image
            image={BROTHERS}
            y={(verticalGap * 24) / 13}
            offsetX={BROTHERS.width / 2}
            offsetY={BROTHERS.height / 2}
          />
        </Group>
      </Layer>
      <Layer x={width} y={height} offsetX={width} offsetY={height}>
        <Group x={width} y={height - verticalGap}>
          <EscapingSlice
            width={width}
            height={height}
            delay={random.float(0, 1000)}
            image={LOS}
            y={-((verticalGap * 3) / 2)}
            offsetX={LOS.width / 2}
            offsetY={LOS.height / 2}
          />
          <EscapingSlice
            width={width}
            height={height}
            delay={random.float(0, 1000)}
            image={COLME}
            offsetX={COLME.width / 2}
            offsetY={COLME.height / 2}
          />
          <EscapingSlice
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
    </>
  );
}

export default Logo;
