import React from "react";
import Button from "./Button";

interface OptionProps {
  onIncreaseSize: () => void;
  onDecreaseSize: () => void;
  onClear: () => void;
  boardSize: number;
  gameOver: boolean;
}

export default function Options({
  onDecreaseSize,
  onIncreaseSize,
  onClear,
  boardSize,
  gameOver,
}: OptionProps) {
  return (
    <div className="mb-3 flex flex-wrap items-center justify-center">
      <Button onClick={onDecreaseSize} content="◁" bgcolor="bg-blue-400" />
      <span className="mr-3 ml-3 text-blue-950 select-none">
        {boardSize} x {boardSize}
      </span>
      <Button onClick={onIncreaseSize} content="▷" bgcolor="bg-blue-400" />
      <Button onClick={onClear} content="↺" bgcolor="bg-purple-400" />
    </div>
  );
}
