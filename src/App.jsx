import { Stage } from "react-konva";

import Logo from "./Logo";
import useWindowSize from "./useWindowSize";

function App() {
  const { width, height } = useWindowSize();

  const logoWidth = width / 2;
  const logoHeight = height / 2;

  return (
    <Stage width={width} height={height} className="frame">
      <Logo width={logoWidth} height={logoHeight} />
    </Stage>
  );
}

export default App;
