import { useState } from "react";
import "./App.css";

function App() {
  const [dotList, setDotList] = useState([]);
  const [undoList, setUndoList] = useState([]);

  const handleClick = (e) => {
    const newDot = {
      clientX: e.clientX,
      clientY: e.clientY,
    };
    setDotList((prev) => [...prev, newDot]);
  };

  const undo = (e) => {
    e.stopPropagation();

    if (dotList.length === 0) {
      return;
    }

    const lastItem = dotList[dotList.length - 1];
    setUndoList((prev) => [...prev, lastItem]);

    setDotList((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });
  };

  const redo = (e) => {
    e.stopPropagation();

    if (undoList.length === 0) {
      return;
    }

    const recoveredDot = undoList[undoList.length - 1];

    setUndoList((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });

    setDotList((prev) => [...prev, recoveredDot]);
  };

  return (
    <div className="App">
      <div className="page" onClick={handleClick}>
        <div className="btns-controls">
          <button onClick={undo}>Desfazer</button>
          <button onClick={redo}>Refazer</button>
        </div>

        {dotList.map((dot) => (
          <div
            className="dot"
            style={{ left: dot.clientX, top: dot.clientY }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
