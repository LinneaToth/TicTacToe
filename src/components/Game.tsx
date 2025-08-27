import React, { useState, useEffect, useRef } from "react";
import { type Field, type Board, type GameProps } from "../types/types";
import GameField from "./GameField";
import Options from "./Options.tsx";

interface GameProps {
  unitSize: number;
}

export default function Game({ unitSize }: GameProps): React.JSX.Element {
  const maxSize: number = 5;
  const minSize: number = 3;
  const [boardSize, setBoardSize] = useState<number>(4);
  const winRef = useRef(boardSize);
  const [board, setBoard] = useState<Board>(newBoard(boardSize));
  const [isPlayerOneActive, setIsPlayerOneActive] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const gameWidths: string[] = [
    `grid-cols-3`,
    `grid-cols-4`,
    `grid-cols-5`,
    `grid-cols-6`,
    `grid-cols-7`,
    `grid-cols-8`,
    `grid-cols-9`,
    `grid-cols-19`,
  ];
  const gridCols: string = gameWidths[boardSize - 3];
  const padding: number = 10;

  useEffect(() => {}, [board]); //check winner

  function onIncreaseSize() {
    if (boardSize === maxSize) return;
    const newBoardSize = boardSize + 1;
    setBoardSize(newBoardSize);
    const updatedBoard: Board = newBoard(newBoardSize);
    setBoard(updatedBoard);
  }

  function onDecreaseSize(): void {
    if (boardSize === minSize) return;
    const newBoardSize = boardSize - 1;
    setBoardSize(newBoardSize);
    const updatedBoard: Board = newBoard(newBoardSize);
    setBoard(updatedBoard);
  }

  function clearBoard(): void {
    setBoard(newBoard(boardSize));
  }

  function handleTurn(): void {
    setIsPlayerOneActive((isPlayerOneActive: boolean) => !isPlayerOneActive);
  }

  function newBoard(size: number = 3): Board {
    if (size < minSize || size > maxSize) {
      throw new Error(
        `We like flexibility, but some boundaries in life are in order! Game board size can range from ${minSize} to ${maxSize}. Sorry.`,
      );
    }
    const mainArray: Board = [];
    for (let i = 0; i < size; i++) {
      mainArray[i] = new Array<Field>(size).fill({
        status: "",
        winner: false,
      });
    }
    return mainArray;
  }

  function handleFieldClick(
    rowIdx: number,
    colIdx: number,
    curField: Field,
  ): void {
    handleTurn();
    console.log(
      (isPlayerOneActive ? "X on " : "O on ") +
        "col: " +
        colIdx +
        ", row: " +
        rowIdx,
    );
    if (curField.status !== "") return;
    setBoard((prevBoard): Board => {
      const updatedBoard: Board = prevBoard.map((row, rowIndex) => {
        if (rowIndex !== rowIdx) return row;
        return row.map((fld, colIndex) => {
          if (colIndex !== colIdx) return fld;
          return { ...fld, status: isPlayerOneActive ? "X" : "O" };
        });
      });
      return updatedBoard;
    });
  }

  return (
    <>
      {" "}
      <Options
        onClear={clearBoard}
        boardSize={boardSize}
        onDecreaseSize={onDecreaseSize}
        onIncreaseSize={onIncreaseSize}
      />
      <div
        className={`grid ${gridCols} border-1 p-2`}
        style={{
          width: `${unitSize * boardSize + 2 * padding}px`,
          height: `${unitSize * boardSize + 2 * padding}px`,
        }}
      >
        {board.map((row: Field[], rowIdx: number) => {
          return row.map((field: Field, colIdx: number) => {
            return (
              <GameField
                key={`row${rowIdx}`}
                rowIdx={rowIdx}
                colIdx={colIdx}
                handleClick={handleFieldClick}
                unitSize={unitSize}
                field={field}
              />
            );
          });
        })}{" "}
      </div>
    </>
  );
}
