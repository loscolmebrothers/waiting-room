import { useEffect, useRef, useCallback } from "react";
import { Layer, Group, Image } from "react-konva";
import { useSpring, animated } from "@react-spring/konva";
import random from "random";

import { setCursor } from "./helpers/cursor";
import useWindowSize from "./useWindowSize";
import layerManager from "./helpers/layer-manager";

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

  const escape = useCallback(
    (origin) => {
      if (isDraggingRef.current) return;

      const speed = 0.6;

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
    },
    [width, height, api],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      escape({ x, y });
    }, delay);

    return () => clearTimeout(timer);
  }, [x, y, delay, escape]);

  function handleDragStart() {
    isDraggingRef.current = true;
    api.stop();
  }

  function handleDragEnd(event) {
    const dropPosition = {
      x: event.target.x(),
      y: event.target.y(),
    };

    isDraggingRef.current = false;

    escape(dropPosition);
  }

  return (
    <AnimatedImage
      {...animation}
      {...props}
      draggable
      onMouseEnter={(event) => setCursor(event, "grab")}
      onMouseLeave={(event) => setCursor(event, "default")}
      onDragStart={(event) => {
        handleDragStart();
        setCursor(event, "grabbing");
      }}
      onDragEnd={(event) => {
        handleDragEnd(event);
        setCursor(event, "grab");
      }}
    />
  );
}

function FloatingText({ delay = 0, initialDelay = 0, baseY = 0, ...props }) {
  const { Image: AnimatedImage } = animated;

  const hasStartedRef = useRef(false);

  const [animation, api] = useSpring(() => ({
    from: { y: baseY },
    config: {
      tension: 80,
      friction: 20,
    },
  }));

  const float = useCallback(
    (currentY) => {
      const floatRange = 15;
      const destination = currentY + random.float(-floatRange, floatRange);

      api.start({
        to: { y: destination },
        onRest: () => {
          float(destination);
        },
      });
    },
    [api],
  );

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      hasStartedRef.current = true;
      const timer = setTimeout(() => {
        float(baseY);
      }, delay);

      return () => clearTimeout(timer);
    }, initialDelay);

    return () => clearTimeout(initialTimer);
  }, [baseY, delay, initialDelay, float]);

  return <AnimatedImage {...animation} {...props} />;
}

function Logo({ assets }) {
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const width = windowWidth / 2;
  const height = windowHeight / 2;
  const verticalGap = 65;

  const LOS = assets.losImage;
  const COLME = assets.colmeImage;
  const BROTHERS = assets.brothersImage;

  return (
    <>
      <Layer
        x={width}
        y={height}
        offsetX={width}
        offsetY={height}
        zIndex={layerManager.logo.placeholder}
      >
        <Group x={width} y={height - verticalGap} opacity={0.08}>
          <FloatingText
            image={LOS}
            baseY={-((verticalGap * 3) / 2)}
            initialDelay={2000}
            delay={random.float(0, 500)}
            offsetX={LOS.width / 2}
            offsetY={LOS.height / 2}
            shadowColor="black"
            shadowBlur={10}
            shadowOffsetX={-2}
            shadowOffsetY={-2}
            shadowOpacity={0.6}
          />
          <FloatingText
            image={COLME}
            baseY={0}
            initialDelay={2000}
            delay={random.float(0, 500)}
            offsetX={COLME.width / 2}
            offsetY={COLME.height / 2}
            shadowColor="black"
            shadowBlur={10}
            shadowOffsetX={-2}
            shadowOffsetY={-2}
            shadowOpacity={0.6}
          />
          <FloatingText
            image={BROTHERS}
            baseY={(verticalGap * 24) / 13}
            initialDelay={2000}
            delay={random.float(0, 500)}
            offsetX={BROTHERS.width / 2}
            offsetY={BROTHERS.height / 2}
            shadowColor="black"
            shadowBlur={10}
            shadowOffsetX={-2}
            shadowOffsetY={-2}
            shadowOpacity={0.6}
          />
        </Group>
      </Layer>
      <Layer
        x={width}
        y={height}
        offsetX={width}
        offsetY={height}
        zIndex={layerManager.logo.escaping}
      >
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
