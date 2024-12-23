import "./App.css";
import { ModeToggle } from "./global/mode-toggle";
import NextChapterButton from "./global/next-chapter-button";
import PreviousChapterButton from "./global/previous-chapter-button";
import Navbar from "./shared/navbar/navbar";

function App() {
  return (
    <main className="font-inter">
      <Navbar />
      <div className="p-4">
        <ModeToggle />
      </div>
      <NextChapterButton />
      <PreviousChapterButton />
    </main>
  )
}

export default App;
