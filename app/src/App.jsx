import { useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

function App() {
  const [position, setPosition] = useState({ x: 200, y: 200 });

  console.log(window.innerHeight, window.innerWidth)
  return (
    <div className='container'>
      <Stage width={700} height={500} className='frame'>
        <Layer>
          <Rect x={position.x} y={position.y} width={100} height={100} fill="blue" draggable
            onMouseEnter={(e) => {
              document.body.style.cursor = 'grab';
            }}
            onMouseLeave={(e) => {
              document.body.style.cursor = 'default';
            }}
            onDragStart={(e) => {
              document.body.style.cursor = 'move';
            }}
            onDragEnd={(e) => {
              document.body.style.cursor = 'grab';
              setPosition({
                x: e.target.x(),
                y: e.target.y()
              });
            }} />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
