import { type Field } from "../types/types";

interface FieldProps {
  row: Field[];
  handleClick: (rowIdx: number, colIdx: number, field: Field) => void;
  rowIdx: number;
  unitSize: number;
}

export default function GameField({
  row,
  handleClick,
  rowIdx,
  unitSize,
}: FieldProps) {
  return (
    <>
      {row.map((field: Field, colIdx) => (
        <div
          onClick={() => handleClick(rowIdx, colIdx, field)}
          className={`rounded-xl border-2 border-white bg-gray-200 p-3 text-center`}
          style={{
            height: unitSize + "px",
            width: unitSize + "px",
          }}
          key={"col" + colIdx}
        >{`${field.status}`}</div>
      ))}
    </>
  );
}
