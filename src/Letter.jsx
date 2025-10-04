import { Layer, Rect, Text } from "react-konva";
import { useSpring, animated } from "@react-spring/konva";

import useWindowSize from "./useWindowSize";
import { setCursor } from "./helpers/cursor";
import layerManager from "./helpers/layer-manager";
import { useRef } from "react";

const visibleCardGap = 25;

function DraggablePaperGroup({ children }) {
  const { Group: AnimatedGroup } = animated;
  const { width } = useWindowSize();
  const groupRef = useRef();

  const [animation, api] = useSpring(() => ({
    x: width / 2000,
    y: 0,
  }));

  function dragBound(position) {
    const maxVerticalDistance = -200;
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

  const paperWidth = 580;
  const paperHeight = 500;

  return (
    <Rect
      x={(width - paperWidth) / 2}
      y={height - visibleCardGap - 15}
      width={paperWidth}
      height={paperHeight}
      fill="white"
      cornerRadius={6}
    />
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
    />
  );
}

function Envelope() {
  const { width, height } = useWindowSize();
  const envelopeWidth = 600;
  const envelopeHeight = 500;

  return (
    <Rect
      x={(width - envelopeWidth) / 2}
      y={height - visibleCardGap}
      width={envelopeWidth}
      height={envelopeHeight}
      fill="red"
      cornerRadius={2}
    />
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
