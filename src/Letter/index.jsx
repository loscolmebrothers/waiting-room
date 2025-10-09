import { Layer } from "react-konva";

import layerManager from "../helpers/layer-manager";
import DraggablePaperGroup from "./DraggablePaperGroup";
import Paper from "./Paper";
import Tab from "./Tab";
import Envelope from "./Envelope";

function Letter() {
  return (
    <Layer zIndex={layerManager.letter}>
      <DraggablePaperGroup>
        <Paper />
        <Tab />
      </DraggablePaperGroup>
      <Envelope />
    </Layer>
  );
}

export default Letter;
