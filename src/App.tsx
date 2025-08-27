import { useState } from "react";
import "./style.css";
import Game from "./components/Game.tsx";

import { type Field, type Board } from "./types/types";

function App() {
  const unitSize: number = 50;

  return (
    <div>
      {" "}
      <header
        className="bg-blue-400` m-auto rounded-2xl border-2 border-white bg-blue-400"
        style={{ width: "208px" }}
      >
        <h1 className="game-font mt-2 text-center text-3xl text-blue-950 text-white text-shadow-md">
          Tic-Tac-Toe
        </h1>
        <h2 className="mb-2 text-center text-sm text-blue-950 text-white italic">
          React ∘ TS ∘ Tailwind ∘ Vite
        </h2>
      </header>
      <main className="flex h-full w-full content-center justify-center">
        <Game unitSize={unitSize} />
      </main>
    </div>
  );
}

export default App;
