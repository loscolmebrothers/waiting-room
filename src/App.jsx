import { Stage, Layer, Image, Group, Rect } from "react-konva";
import useImage from "use-image";

function App() {
  const [LOS] = useImage(
    "https://assets.loscolmebrothers.com/logo/slices/vector/LOS.svg",
  );
  const [COLME] = useImage(
    "https://assets.loscolmebrothers.com/logo/slices/vector/COLME.svg",
  );

  const [BROTHERS] = useImage(
    "https://assets.loscolmebrothers.com/logo/slices/vector/BROTHERS.svg",
  );

  const isLogoLoading = !LOS || !COLME || !BROTHERS;

  const layerWidth = window.innerWidth / 2;
  const layerHeight = window.innerHeight / 2;
  const gap = 65;

  if (isLogoLoading) return <div> Loading...</div>;

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      className="frame"
    >
      <Layer
        id="logo__layer"
        x={layerWidth}
        y={layerHeight}
        offsetX={layerWidth}
        offsetY={layerHeight}
      >
        <Group x={layerWidth} y={layerHeight - gap}>
          <Image
            image={LOS}
            y={-((gap * 3) / 2)}
            offsetX={LOS.width / 2}
            offsetY={LOS.height / 2}
          />
          <Image
            image={COLME}
            offsetX={COLME.width / 2}
            offsetY={COLME.height / 2}
          />
          <Image
            image={BROTHERS}
            y={(gap * 24) / 13}
            offsetX={BROTHERS.width / 2}
            offsetY={BROTHERS.height / 2}
          />
        </Group>
      </Layer>
    </Stage>
  );
}

export default App;
