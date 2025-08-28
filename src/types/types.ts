export type Field = {
  status: "" | "X" | "O";
  winner: boolean;
  id: number;
};
export type Board = Field[];
