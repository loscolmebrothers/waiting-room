import { useRef } from "react";
import { useSpring, animated } from "@react-spring/konva";

import useWindowSize from "../useWindowSize";
import { setCursor } from "../helpers/cursor";
import { paperHeight } from "./constants";

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

export default DraggablePaperGroup;
