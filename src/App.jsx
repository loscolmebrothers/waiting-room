import { Stage } from "react-konva";

import Logo from "./Logo";
import useWindowSize from "./useWindowSize";
import Letter from "./Letter";

function App() {
  const { width, height } = useWindowSize();

  return (
    <Stage width={width} height={height} className="frame">
      <Letter />
      <Logo />
    </Stage>
  );
}

export default App;
