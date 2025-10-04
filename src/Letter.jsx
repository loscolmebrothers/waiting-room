import { useRef } from "react";
import { Group, Layer, Rect, Text } from "react-konva";
import { useSpring, animated } from "@react-spring/konva";

import useWindowSize from "./useWindowSize";
import { setCursor } from "./helpers/cursor";
import layerManager from "./helpers/layer-manager";

const visibleCardGap = 35;
const paperHeight = 120;

function DraggablePaperGroup({ children }) {
  const { Group: AnimatedGroup } = animated;
  const { width } = useWindowSize();
  const groupRef = useRef();

  const [animation, api] = useSpring(() => ({
    x: width / 2000,
    y: 0,
  }));

  function dragBound(position) {
    const maxVerticalDistance = -paperHeight;
    const minVerticalDistance = -10;

    function getBoundY(y) {
      let boundY;

      if (y > minVerticalDistance) {
        boundY = minVerticalDistance;
      } else if (y < maxVerticalDistance) {
        boundY = maxVerticalDistance;
      } else {
        boundY = y;
      }

      return boundY;
    }

    return {
      x: width / 2000,
      y: getBoundY(position.y),
    };
  }

  function handleDragEnd() {
    api.start({
      to: {
        x: width / 2000,
        y: 0,
      },
      config: {
        tension: 200,
        friction: 18,
      },
      immediate: false,
    });
  }

  function handleDragMove(e) {
    api.start({
      x: e.target.x(),
      y: e.target.y(),
      immediate: true,
    });
  }

  return (
    <AnimatedGroup
      {...animation}
      ref={groupRef}
      draggable
      onMouseEnter={(event) => setCursor(event, "grab")}
      onMouseLeave={(event) => setCursor(event, "default")}
      onDragStart={(event) => {
        setCursor(event, "grabbing");
      }}
      onDragMove={handleDragMove}
      onDragEnd={(event) => {
        setCursor(event, "grab");
        handleDragEnd(event);
      }}
      dragBoundFunc={dragBound}
    >
      {children}
    </AnimatedGroup>
  );
}

function Paper() {
  const { width, height } = useWindowSize();

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
      />
      <Text
        x={0}
        y={50}
        text={"This site is under construction. Stay tuned!"}
        fontSize={18}
        fill="black"
        align="center"
        verticalAlign="middle"
        width={paperWidth}
      />
    </Group>
  );
}

function Tab() {
  const { width, height } = useWindowSize();
  const tabWidth = 35;
  const tabHeight = 40;

  return (
    <Rect
      x={(width - tabWidth) / 2}
      y={height - visibleCardGap - 50}
      width={tabWidth}
      height={tabHeight}
      fill="teal"
      cornerRadius={1}
    />
  );
}

function Envelope() {
  const { width, height } = useWindowSize();
  const envelopeWidth = 600;
  const envelopeHeight = 500;

  const envelopeX = (width - envelopeWidth) / 2;
  const envelopeY = height - visibleCardGap;

  function handleClickEmail() {
    window.location.href = "mailto:hello@loscolmebrothers.com";
  }

  return (
    <>
      <Group
        x={envelopeX + envelopeWidth / 2}
        y={envelopeY + envelopeHeight / 2}
        offsetX={envelopeWidth / 2}
        offsetY={envelopeHeight / 2}
      >
        <Rect
          x={0}
          y={0}
          width={envelopeWidth}
          height={envelopeHeight}
          fill="teal"
          cornerRadius={2}
        />

        <Text
          x={0}
          y={0}
          text={"hello@loscolmebrothers.com"}
          fontSize={12}
          fill="white"
          align="center"
          verticalAlign="middle"
          width={envelopeWidth}
          padding={15}
          onClick={handleClickEmail}
        />
      </Group>
    </>
  );
}

function Letter() {
  return (
    <Layer zIndex={layerManager.letter}>
      <DraggablePaperGroup>
        <Paper />
        <Tab />
      </DraggablePaperGroup>
      <Envelope />
    </Layer>
  );
}

export default Letter;
