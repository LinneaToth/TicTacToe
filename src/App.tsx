import "./style.css";
import Game from "./components/Game.tsx";
import Header from "./components/Header.tsx";

function App() {
  return (
    <div className="mr-auto ml-auto flex h-full w-full flex-col items-center">
      <Header />
      <Game unitSize={50} maxSize={5} minSize={3} />
    </div>
  );
}

export default App;
