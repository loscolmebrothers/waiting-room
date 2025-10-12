import { Layer, Rect, Text, Group } from "react-konva";
import { useSpring, animated } from "@react-spring/konva";
import { useRef } from "react";
import useWindowSize from "./useWindowSize";
import { setCursor } from "./helpers/cursor";

function Badge() {
  const { width } = useWindowSize();
  const badgeText = "🏃 Don't let them get away!";
  const padding = 16;
  const fontSize = 14;
  const badgeHeight = 32;
  const badgeWidth = badgeText.length * (fontSize * 0.6) + padding * 1.5;
  const badgeX = (width - badgeWidth) / 2;
  const groupRef = useRef();

  const { Group: AnimatedGroup, Rect: AnimatedRect } = animated;

  const scaleAnimation = useSpring({
    from: { scaleX: 1, scaleY: 1 },
    to: { scaleX: 1.005, scaleY: 1.005 },
    config: { duration: 3000 },
    loop: { reverse: true },
  });

  const shadowAnimation = useSpring({
    from: { shadowOffsetY: 8 },
    to: { shadowOffsetY: 4 },
    config: { duration: 2000 },
    loop: { reverse: true },
  });

  const handleMouseEnter = (event) => {
    const target = event.target.getParent();
    if (target) {
      target.to({
        opacity: 0,
        duration: 0.05,
      });
    }
    setCursor(event, "help");
  };

  const handleMouseLeave = (event) => {
    const target = event.target.getParent();
    if (target) {
      target.to({
        opacity: 1,
        duration: 0.2,
      });
    }
    setCursor(event, "default");
  };

  return (
    <Layer>
      <AnimatedGroup
        ref={groupRef}
        x={badgeX + badgeWidth / 2}
        y={20 + badgeHeight / 2}
        scaleX={scaleAnimation.scaleX}
        scaleY={scaleAnimation.scaleY}
      >
        <AnimatedRect
          x={0}
          y={0}
          width={badgeWidth}
          height={badgeHeight}
          fill="rgba(0, 0, 0, 0.05)"
          cornerRadius={16}
          shadowColor="rgba(0, 0, 0, 0.8)"
          shadowBlur={3}
          shadowOffsetY={shadowAnimation.shadowOffsetY}
          offsetX={badgeWidth / 2}
          offsetY={badgeHeight / 2}
          listening={false}
        />
        <Rect
          x={0}
          y={0}
          width={badgeWidth}
          height={badgeHeight}
          fill="rgba(255, 255, 255, 0.3)"
          cornerRadius={16}
          shadowColor="rgba(0, 0, 0, 0.08)"
          shadowBlur={8}
          shadowOffsetY={2}
          offsetX={badgeWidth / 2}
          offsetY={badgeHeight / 2}
          listening={false}
        />
        <Rect
          x={0}
          y={0}
          width={badgeWidth}
          height={badgeHeight}
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth={1.5}
          cornerRadius={16}
          offsetX={badgeWidth / 2}
          offsetY={badgeHeight / 2}
          listening={false}
        />
        <Rect
          x={0}
          y={0}
          width={badgeWidth - 2}
          height={badgeHeight - 2}
          stroke="rgba(0, 0, 0, 0.1)"
          strokeWidth={0.5}
          cornerRadius={15}
          offsetX={(badgeWidth - 2) / 2}
          offsetY={(badgeHeight - 2) / 2}
          listening={false}
        />
        <Text
          x={0}
          y={0}
          width={badgeWidth}
          height={badgeHeight}
          text={badgeText}
          fontSize={fontSize}
          fontFamily="ApfelGrotezk"
          fill="rgba(0, 0, 0, 0.8)"
          align="center"
          verticalAlign="middle"
          offsetX={badgeWidth / 2}
          offsetY={badgeHeight / 2}
          listening={false}
        />
        <Rect
          x={0}
          y={0}
          width={badgeWidth}
          height={badgeHeight}
          fill="transparent"
          cornerRadius={16}
          offsetX={badgeWidth / 2}
          offsetY={badgeHeight / 2}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </AnimatedGroup>
    </Layer>
  );
}

export default Badge;
