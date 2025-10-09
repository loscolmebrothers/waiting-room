import { Rect } from "react-konva";

import useWindowSize from "../useWindowSize";
import { visibleCardGap } from "./constants";

function Tab() {
  const { width, height } = useWindowSize();
  const tabWidth = 35;
  const tabHeight = 40;

  return (
    <Rect
      x={(width - tabWidth) / 2}
      y={height - visibleCardGap - 50}
      width={tabWidth}
      height={tabHeight}
      fill="teal"
      cornerRadius={1}
    />
  );
}

export default Tab;
