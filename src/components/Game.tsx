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
  const padding: number = 15;
  const boardWidth: string =
    unitSize * boardSize +
    (2 * padding + (Number(boardSize - 3) - 1)) * 2 +
    "px";

  useEffect(() => {
    checkWinner(isPlayerOneActive ? "O" : "X");
  }, [board]); //check winner

  function checkWinner(playerName: string) {
    // Check draw
    const drawChecked = board.map((row) =>
      row.every((field) => field.status !== ""),
    );
    if (drawChecked.every((checkedRow) => checkedRow === true)) {
      console.log("it's a draw.");
      setGameOver(true);
    }

    //Check rows
    for (let row = 0; row < board.length; row++) {
      if (board[row].every((field) => field.status === playerName)) {
        setGameOver(true);
        board[row].map((field) => (field.winner = true));
        console.log(playerName + " has won");
        return;
      }
    }

    //Check columns
    for (let col = 0; col < boardSize; col++) {
      if (board.every((row) => row[col].status === playerName)) {
        setGameOver(true);
        console.log(playerName + " has won");
        board.map((row) => (row[col].winner = true));
        return;
      }
    }

    //Check diagonal
    if (board.every((row, index) => row[index].status === playerName)) {
      board.map((row, index) => {
        row[index].winner = true;
      });
      setGameOver(true);
      console.log(playerName + " has won");
      return;
    }

    //Check reverse diagonal
    if (
      board.every(
        (row, index) => row[boardSize - index - 1].status === playerName,
      )
    ) {
      board.map((row, index) => {
        row[boardSize - index - 1].winner = true;
      });
      setGameOver(true);
      console.log(playerName + " has won");
      return;
    }
  }

  function onIncreaseSize() {
    if (boardSize === maxSize) return;
    const newBoardSize = boardSize + 1;
    setBoardSize(newBoardSize);
    const updatedBoard: Board = newBoard(newBoardSize);
    setBoard(updatedBoard);
    setGameOver(false);
  }

  function onDecreaseSize(): void {
    if (boardSize === minSize) return;
    const newBoardSize = boardSize - 1;
    setBoardSize(newBoardSize);
    const updatedBoard: Board = newBoard(newBoardSize);
    setBoard(updatedBoard);
    setGameOver(false);
  }

  function clearBoard(): void {
    setBoard(newBoard(boardSize));
    setGameOver(false);
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
    if (gameOver) return;
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
    <div style={{ width: boardWidth }} className="mt-3">
      {" "}
      <Options
        onClear={clearBoard}
        boardSize={boardSize}
        onDecreaseSize={onDecreaseSize}
        onIncreaseSize={onIncreaseSize}
      />
      <div
        className={`grid ${gridCols} items-center justify-items-center gap-1 rounded-2xl border-2 border-white bg-blue-400`}
        style={{
          padding: padding,
          height: boardWidth,
        }}
      >
        {board.map((row: Field[], rowIdx: number) => {
          return row.map((field: Field, colIdx: number) => {
            return (
              <GameField
                gameOver={gameOver}
                key={`row${rowIdx}col${colIdx}`}
                handleClick={() => handleFieldClick(rowIdx, colIdx, field)}
                unitSize={unitSize}
                field={field}
              />
            );
          });
        })}{" "}
      </div>
    </div>
  );
}
