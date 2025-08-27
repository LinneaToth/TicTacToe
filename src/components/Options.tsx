import React from "react";

interface OptionProps {
  onIncreaseSize: () => void;
  onDecreaseSize: () => void;
  onClear: () => void;
  boardSize: number;
}

export default function Options({
  onDecreaseSize,
  onIncreaseSize,
  onClear,
  boardSize,
}: OptionProps) {
  return (
    <div>
      <button onClick={onDecreaseSize}>◁</button>
      <span>
        {boardSize} x {boardSize}
      </span>
      <button onClick={onIncreaseSize}>▷</button>
      <button className="block" onClick={onClear}>
        Restart Game
      </button>
    </div>
  );
}
