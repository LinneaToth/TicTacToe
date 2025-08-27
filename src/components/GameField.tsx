import { type Field } from "../types/types";

interface FieldProps {
  handleClick: (rowIdx: number, colIdx: number, field: Field) => void;
  rowIdx: number;
  unitSize: number;
  colIdx: number;
  field: Field;
}

export default function GameField({
  handleClick,
  rowIdx,
  unitSize,
  field,
  colIdx,
}: FieldProps) {
  const cursor = field.status === "" ? "cursor-pointer" : "cursor-arrow";
  const hover = field.status === "" ? "hover:bg-gray-300" : "";

  return (
    <div
      onClick={() => handleClick(rowIdx, colIdx, field)}
      className={`game-font inline-block rounded-xl border-2 border-white bg-gray-200 p-3 text-center align-middle text-xl ${hover} ${cursor}`}
      style={{
        height: unitSize + "px",
        width: unitSize + "px",
      }}
      key={"col" + colIdx}
    >{`${field.status}`}</div>
  );
}
