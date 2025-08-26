import React, { useState, useEffect, useRef } from "react";
import { type Field, type Board, type GameProps } from "../types/types";
import GameField from "./GameField";
import Options from "./Options.tsx";

interface GameProps {
  unitSize: number;
}

export default function Game({ unitSize }: GameProps): React.JSX.Element {
  const [boardSize, setBoardSize] = useState<number>(4);
  const winRef = useRef(boardSize);
  const [board, setBoard] = useState<Board>(newBoard(boardSize));
  const [isPlayerOneActive, setIsPlayerOneActive] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const gameWidth: number = unitSize * boardSize;
  const gridCols: string = `grid-cols-${boardSize}`;
  const padding: number = 10;

  useEffect(() => {}, [board]); //check winner

  function handleTurn(): void {
    setIsPlayerOneActive((isPlayerOneActive: boolean) => !isPlayerOneActive);
  }

  function newBoard(size: number = 3): Board {
    if (size < 3 || size > 10) {
      throw new Error(
        "We like flexibility, but some boundaries in life are in order! Game board size can range from 3 to 10. Sorry.",
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
      <div
        className={`grid ${gridCols} border-1 p-2`}
        style={{
          width: `${unitSize * boardSize + 2 * padding}px`,
          height: `${unitSize * boardSize + 2 * padding}px`,
        }}
      >
        {board.map((row: Field[], rowIdx: number) => {
          return (
            <GameField
              key={`row${rowIdx}`}
              row={row}
              rowIdx={rowIdx}
              handleClick={handleFieldClick}
              unitSize={unitSize}
            />
          );
        })}{" "}
      </div>
      <Options setGameOver={setGameOver} />
    </>
  );
}
