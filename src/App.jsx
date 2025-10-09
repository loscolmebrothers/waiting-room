import { Stage } from "react-konva";

import Logo from "./Logo";
import useWindowSize from "./useWindowSize";
import Letter from "./Letter";
import Badge from "./Badge";

function App() {
  const { width, height } = useWindowSize();

  return (
    <Stage
      width={width}
      height={height}
      pixelRatio={1}
      perfectDrawEnabled={false}
      shadowForStrokeEnabled={false}
      strokeScaleEnabled={false}
    >
      <Badge />
      <Letter />
      <Logo />
    </Stage>
  );
}

export default App;
