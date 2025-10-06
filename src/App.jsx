import { Stage } from "react-konva";

import Logo from "./Logo";
import useWindowSize from "./useWindowSize";
import Letter from "./Letter";
import { useState } from "react";
import Intro from "./Intro";
import { useEffect } from "react";

function App() {
  const { width, height } = useWindowSize();
  const [countdown, setCountdown] = useState(3);
  const [isIntroFinished, setIsIntroFinished] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setIsIntroFinished(true);
    }
  }, [countdown]);

  return (
    <Stage width={width} height={height} className="frame">
      {!isIntroFinished ? (
        <Intro countdown={countdown} />
      ) : (
        <>
          <Letter />
          <Logo />
        </>
      )}
    </Stage>
  );
}

export default App;
