import { Stage } from "react-konva";

import Logo from "./Logo";
import useWindowSize from "./useWindowSize";
import Letter from "./Letter";
import Badge from "./Badge";
import Loader from "./Loader";
import useAssetLoader from "./useAssetLoader";
import SafariFallback from "./safari-ios-patch/SafariFallback";
import { isSafariIOS } from "./safari-ios-patch/detectSafariIOS";

function App() {
  const { width, height } = useWindowSize();
  const { isLoading, progress, assets } = useAssetLoader();

  if (isSafariIOS()) {
    return <SafariFallback />;
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
