export type Field = {
  status: "" | "X" | "O";
  winner: boolean;
};
export type Board = Field[][];
