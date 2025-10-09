import { useEffect, useRef, useState } from "react";
import { useSpring, animated, to } from "@react-spring/konva";

import useWindowSize from "../useWindowSize";
import { visibleCardGap } from "./constants";
import useImage from "use-image";

function Tab() {
  const { width, height } = useWindowSize();
  const [daguerreotypeTexture] = useImage(
    "https://assets.loscolmebrothers.com/textures/daguerreotype.jpg",
  );
  const arrowRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0 });

  const tabWidth = 35;
  const tabHeight = 60;
  const tabY = height - visibleCardGap - 65;
  const arrowScale = 0.8;

  const AnimatedRect = animated.Rect;
  const AnimatedPath = animated.Path;

  useEffect(() => {
    if (arrowRef.current) {
      const bbox = arrowRef.current.getSelfRect();
      const arrowWidth = bbox.width * arrowScale;
      const arrowHeight = bbox.height * arrowScale;

      const centerX = width / 2 - arrowWidth / 2 - bbox.x * arrowScale;
      const baseCenterY =
        tabY + tabHeight / 2 - arrowHeight / 2 - bbox.y * arrowScale;

      setArrowPosition({ x: centerX, y: baseCenterY });
    }
  }, [width, height, tabY, tabHeight, arrowScale]);

  const hoverAnimation = useSpring({
    yOffset: isHovered ? -3 : 0,
    shadowBlur: isHovered ? 12 : 8,
    shadowOffsetY: isHovered ? 4 : 2,
    config: {
      tension: 200,
      friction: 20,
    },
  });

  const [arrowAnimation, arrowApi] = useSpring(() => ({
    from: { yOffset: 0, opacity: 0.4 },
    config: {
      duration: 1000,
    },
  }));

  useEffect(() => {
    const animate = () => {
      arrowApi.start({
        from: { yOffset: 0, opacity: 0.4 },
        to: async (next) => {
          while (true) {
            await next({ yOffset: -8, opacity: 1 });
            await next({ yOffset: 0, opacity: 0.4 });
          }
        },
      });
    };

    animate();

    return () => {
      arrowApi.stop();
    };
  }, [arrowApi]);

  return (
    <>
      <AnimatedRect
        x={(width - tabWidth) / 2}
        y={hoverAnimation.yOffset.to((offset) => tabY + offset)}
        width={tabWidth}
        height={tabHeight}
        fill="pink"
        cornerRadius={1}
        shadowColor="rgba(0, 0, 0, 0.15)"
        shadowBlur={8}
        shadowOffset={hoverAnimation.shadowOffsetY.to((y) => ({ x: 0, y }))}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <AnimatedRect
        x={(width - tabWidth) / 2}
        y={hoverAnimation.yOffset.to((offset) => tabY + offset)}
        width={tabWidth}
        height={tabHeight}
        fillPatternImage={daguerreotypeTexture}
        fillPatternScale={{ x: 0.2, y: 0.2 }}
        fillPatternRepeat="repeat"
        opacity={0.2}
        cornerRadius={1}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <AnimatedPath
        ref={arrowRef}
        data="M12.0321 1.01712L7.75751 5.22761L9.161 6.65246L11.0197 4.82165L10.9644 22.9768L12.9644 22.9829L13.0195 4.86974L14.8177 6.69525L16.2425 5.29175L12.0321 1.01712Z"
        fill="#333"
        x={arrowPosition.x}
        y={to(
          [hoverAnimation.yOffset, arrowAnimation.yOffset],
          (hoverOffset, bounceOffset) =>
            arrowPosition.y + hoverOffset + bounceOffset,
        )}
        opacity={arrowAnimation.opacity}
        scaleX={arrowScale}
        scaleY={arrowScale}
      />
    </>
  );
}

export default Tab;
