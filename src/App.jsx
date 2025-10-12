import { Stage } from "react-konva";

import Logo from "./Logo";
import useWindowSize from "./useWindowSize";
import Letter from "./Letter";
import Badge from "./Badge";
import Loader from "./Loader";
import useAssetLoader from "./useAssetLoader";
import IOSFallback from "./ios-patch/IOSFallback";
import { isIOS } from "./ios-patch/detectIOS";

function App() {
  const { width, height } = useWindowSize();
  const { isLoading, progress, assets } = useAssetLoader();

  if (isIOS()) {
    return <IOSFallback />;
  }

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
          <Logo assets={assets.images} />
        </>
      )}
    </Stage>
  );
}

export default App;
