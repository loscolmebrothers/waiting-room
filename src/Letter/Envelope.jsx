import { useRef } from "react";
import { Group, Rect } from "react-konva";
import { animated } from "@react-spring/konva";

import useWindowSize from "../useWindowSize";
import { setCursor } from "../helpers/cursor";
import { visibleCardGap } from "./constants";
import useEnvelopeAnimations from "./useEnvelopeAnimations";
import useImage from "use-image";

function Envelope() {
  const { width, height } = useWindowSize();
  const { Line: AnimatedLine, Text: AnimatedText } = animated;

  const [cartulinaTexture] = useImage(
    "https://assets.loscolmebrothers.com/textures/cartulina.jpg",
  );

  const textRef = useRef();

  const envelopeWidth = 600;
  const envelopeHeight = 500;

  const envelopeX = (width - envelopeWidth) / 2;
  const envelopeY = height - visibleCardGap;

  const emailText = "hello@loscolmebrothers.com";
  const emailTextFontSize = 12;
  const emailTextWidth =
    textRef.current?.getTextWidth() ||
    emailText.length * emailTextFontSize * 0.6;

  const underlineWidth = emailTextWidth * 0.75 + 40;
  const underlineStartX = (envelopeWidth - underlineWidth) / 2;
  const underlineEndX = underlineStartX + underlineWidth;
  const underlineY = 38;

  const { underlineAnimation, textAnimation, animateIn, animateOut } =
    useEnvelopeAnimations(underlineStartX, underlineEndX, underlineY);

  function handleClickEmail() {
    window.location.href = "mailto:hello@loscolmebrothers.com";
  }

  function handleMouseEnter(event) {
    setCursor(event, "pointer");
    animateIn();
  }

  function handleMouseLeave(event) {
    setCursor(event, "default");
    animateOut();
  }

  return (
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
        fill="rgba(255, 206, 27)"
        cornerRadius={2}
        shadowColor="rgba(0, 0, 0, 0.3)"
        shadowBlur={20}
        shadowOffsetX={0}
        shadowOffsetY={4}
      />
      <Rect
        x={0}
        y={0}
        width={envelopeWidth}
        height={envelopeHeight}
        fillPatternImage={cartulinaTexture}
        fillPatternRepeat="repeat"
        fillPatternScale={{ x: 0.3, y: 0.3 }}
        opacity={0.4}
        cornerRadius={2}
      />

      <AnimatedText
        {...textAnimation}
        ref={textRef}
        x={envelopeWidth / 2}
        y={25}
        offsetX={
          textRef.current?.getTextWidth()
            ? textRef.current.getTextWidth() / 2
            : 0
        }
        offsetY={emailTextFontSize / 2}
        text={emailText}
        fontSize={emailTextFontSize}
        fontFamily="ApfelGrotezk"
        fill="black"
        opacity={0.6}
        onClick={handleClickEmail}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      <AnimatedLine
        {...underlineAnimation}
        stroke="white"
        strokeWidth={1}
        lineCap="round"
      />
    </Group>
  );
}

export default Envelope;
