import "./App.css";
import { ModeToggle } from "./global/mode-toggle";
import Navbar from "./shared/navbar/navbar";

function App() {
  return (
    <main className="font-inter">
      <Navbar />
      <div className="p-4">
        <ModeToggle />
      </div>
    </main>
  )
}

export default App;
