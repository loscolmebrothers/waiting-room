import { Stage } from "react-konva";

import Logo from "./Logo";
import useWindowSize from "./useWindowSize";
import Letter from "./Letter";
import Badge from "./Badge";
import Loader from "./Loader";
import useAssetLoader from "./useAssetLoader";

function App() {
  const { width, height } = useWindowSize();
  const { isLoading, progress } = useAssetLoader();

  return (
    <Stage
      width={width}
      height={height}
      pixelRatio={1}
      perfectDrawEnabled={false}
      shadowForStrokeEnabled={false}
      strokeScaleEnabled={false}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Badge />
          <Letter />
          <Logo />
        </>
      )}
    </Stage>
  );
}

export default App;
