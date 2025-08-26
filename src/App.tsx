import { useState } from "react";
import "./style.css";
import Game from "./components/Game.tsx";

import { type Field, type Board } from "./types/types";

function App() {
  const unitSize: number = 50;

  return (
    <>
      <Game unitSize={unitSize} />
    </>
  );
}

export default App;
