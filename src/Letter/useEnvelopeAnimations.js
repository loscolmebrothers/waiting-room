import { useSpring } from "@react-spring/konva";
import createWavyPoints from "./createWavyPoints";

function useEnvelopeAnimations(underlineStartX, underlineEndX, underlineY) {
  const [underlineAnimation, underlineApi] = useSpring(() => ({
    points: createWavyPoints(underlineStartX, underlineStartX, underlineY),
    opacity: 0,
    config: {
      tension: 300,
      friction: 25,
    },
  }));

  const [textAnimation, textApi] = useSpring(() => ({
    scaleX: 1,
    scaleY: 1,
    config: {
      tension: 300,
      friction: 25,
    },
  }));

  function animateIn() {
    underlineApi.start({
      points: createWavyPoints(underlineStartX, underlineEndX, underlineY),
      opacity: 1,
    });
    textApi.start({
      scaleX: 1.08,
      scaleY: 1.08,
    });
  }

  function animateOut() {
    underlineApi.start({
      points: createWavyPoints(underlineStartX, underlineStartX, underlineY),
      opacity: 0,
      config: {
        tension: 200,
        friction: 30,
      },
    });
    textApi.start({
      scaleX: 1,
      scaleY: 1,
      config: {
        tension: 200,
        friction: 30,
      },
    });
  }

  return {
    underlineAnimation,
    textAnimation,
    animateIn,
    animateOut,
  };
}

export default useEnvelopeAnimations;
