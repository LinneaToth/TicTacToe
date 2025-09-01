export default function Header() {
  return (
    <header
      className="bg-blue-400` block rounded-2xl border-2 border-white bg-blue-400 select-none"
      style={{ width: "208px" }}
    >
      <h1 className="game-font mt-2 text-center text-3xl text-blue-950 text-white text-shadow-md">
        Tic-Tac-Toe
      </h1>
      <h2 className="mb-2 text-center text-sm text-blue-950 text-white italic">
        React ∘ TS ∘ Tailwind ∘ Vite
      </h2>
    </header>
  );
}
