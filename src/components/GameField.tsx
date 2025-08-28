import { type Field } from "../types/types";

interface FieldProps {
  handleClick: () => void;
  unitSize: number;
  field: Field;
  gameOver: boolean;
}

export default function GameField({
  handleClick,
  unitSize,
  field,
  gameOver,
}: FieldProps) {
  const cursor: string =
    field.status === "" && !gameOver ? "cursor-pointer" : "cursor-arrow";
  const hover: string =
    field.status === "" && !gameOver ? "hover:bg-blue-200" : "";
  const bg: string = field.winner === false ? "bg-blue-100" : "bg-white";

  return (
    <div
      onClick={handleClick}
      className={`game-font inline-block rounded-xl border-2 border-white shadow-inner shadow-gray-500/50 select-none ${bg} p-3 text-center align-middle text-xl text-blue-950 ${hover} ${cursor}`}
      style={{
        height: unitSize + "px",
        width: unitSize + "px",
      }}
    >{`${field.status}`}</div>
  );
}
