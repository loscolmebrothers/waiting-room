import { Stage } from "react-konva";

import Logo from "./Logo";
import useWindowSize from "./useWindowSize";
import Letter from "./Letter";
import { useState } from "react";
import Intro from "./Intro";

function App() {
  const { width, height } = useWindowSize();
  const [isIntroFinished, setIsIntroFinished] = useState(false);

  return (
    <Stage width={width} height={height} className="frame">
      {!isIntroFinished ? (
        <Intro finish={() => setIsIntroFinished(true)} />
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
