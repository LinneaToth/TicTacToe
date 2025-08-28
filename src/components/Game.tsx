import React, { useState, useEffect } from "react";
import { type Field, type Board, type GameProps } from "../types/types";
import GameField from "./GameField";
import Options from "./Options.tsx";

interface GameProps {
  unitSize: number;
  maxSize: number;
  minSize: number;
}

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

export default function Game({
  unitSize,
  maxSize,
  minSize,
}: GameProps): React.JSX.Element {
  const [boardSize, setBoardSize] = useState<number>(3);
  const [board, setBoard] = useState<Board>(newBoard(boardSize));
  const [isPlayerOneActive, setIsPlayerOneActive] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const gridCols: string = gameWidths[boardSize - 3];
  const padding: number = 15;
  const boardWidth: string =
    unitSize * boardSize +
    (2 * padding + (Number(boardSize - 3) - 1)) * 2 +
    "px";

  function newBoard(size: number = 3): Board {
    if (size < minSize || size > maxSize) {
      throw new Error(
        `We like flexibility, but some boundaries in life are in order! Game board size can range from ${minSize} to ${maxSize}. Sorry.`,
      );
    }
    return Array.from({ length: size * size }, (_, i) => ({
      status: "",
      winner: false,
      id: i,
    }));
  }
  useEffect(() => {
    if (gameOver) return; //Guard, ensuring I don't get an infinite loop where the effect changes the board AND listens for board changes
    const playerName = isPlayerOneActive ? "O" : "X";

    function showWinningFields(winningIndexes: number[]) {
      const boardWithWinners: Board = [...board];
      winningIndexes.forEach(
        (winner) => (boardWithWinners[winner].winner = true),
      );
      setBoard(boardWithWinners);
    }

    //Check rows & columns
    for (let i = 0; i < boardSize; i++) {
      const winnersCol: number[] = [];
      const col: Field[] = board.filter((_, index) => {
        if (index % boardSize === i) winnersCol.push(index);
        return index % boardSize === i;
      });

      if (col.every((f) => f.status === playerName)) {
        showWinningFields(winnersCol);
        setGameOver(true);
        return;
      }

      const row: Field[] = board.slice(
        i * boardSize,
        i * boardSize + boardSize,
      );

      if (row.every((f) => f.status === playerName)) {
        const winnersRow: number[] = [];
        for (let j = 0; j < boardSize; j++) {
          winnersRow.push(boardSize * i + j);
        }
        showWinningFields(winnersRow);
        setGameOver(true);
      }
    }

    //Check diagonals
    let rowCount: number = 0;
    const diagonalDown: Field[] = board.filter((_, index) => {
      if (index % boardSize === 0) rowCount++;
      return index % boardSize === rowCount - 1;
    });
    let colCount = boardSize;
    const diagonalUp: Field[] = board.filter((_, index) => {
      if (index % boardSize === 0) colCount--;
      return index % boardSize === colCount;
    });

    if (diagonalDown.every((f) => f.status === playerName)) {
      const winnersDiagonalDown = diagonalDown.map((f) => {
        return f.id;
      });
      showWinningFields(winnersDiagonalDown);
      setGameOver(true);
      return;
    }

    if (diagonalUp.every((f) => f.status === playerName)) {
      const winnersDiagonalUp = diagonalUp.map((f) => {
        return f.id;
      });
      showWinningFields(winnersDiagonalUp);
      setGameOver(true);
      return;
    }

    // Check draw
    if (board.every((field) => field.status !== "")) {
      setGameOver(true);
    }
  }, [board, isPlayerOneActive, boardSize, gameOver]); //check winner

  function handleChangeSize(change: number): void {
    if (boardSize + change > maxSize || boardSize + change < minSize) return;
    const newBoardSize = boardSize + change;
    setBoardSize(newBoardSize);
    const updatedBoard: Board = newBoard(newBoardSize);
    setBoard(updatedBoard);
    setGameOver(false);
  }

  function handleFieldClick(index: number) {
    if (gameOver) return;
    handleTurn();
    if (board[index].status !== "") return;

    const newBoard: Board = [...board];
    newBoard[index].status = isPlayerOneActive ? "X" : "O";
    setBoard(newBoard);
  }

  function clearBoard(): void {
    setBoard(newBoard(boardSize));
    setGameOver(false);
  }

  function handleTurn(): void {
    setIsPlayerOneActive((isPlayerOneActive: boolean) => !isPlayerOneActive);
  }

  return (
    <div style={{ width: boardWidth }} className="mt-3">
      {" "}
      <Options
        onClear={clearBoard}
        boardSize={boardSize}
        onDecreaseSize={() => handleChangeSize(-1)}
        onIncreaseSize={() => handleChangeSize(1)}
      />
      <div
        className={`grid ${gridCols} items-center justify-items-center gap-1 rounded-2xl border-2 border-white bg-blue-400`}
        style={{
          padding: padding,
          height: boardWidth,
        }}
      >
        {board.map((f: Field, fIdx: number) => {
          return (
            <GameField
              gameOver={gameOver}
              key={`f${fIdx}`}
              handleClick={() => handleFieldClick(f.id)}
              unitSize={unitSize}
              field={f}
            />
          );
        })}{" "}
      </div>
    </div>
  );
}
