import "./App.css";
import NextChapterButton from "./global/next-chapter-button";
import PreviousChapterButton from "./global/previous-chapter-button";
import Reader from "./pages/reader";
import { useBookSetting } from "./providers/book-provider";
import Navbar from "./shared/navbar/navbar";

function App() {
  const { fontFamily } = useBookSetting();
  return (
    <main className={`${fontFamily === "Inter" ? "font-inter" : "font-source-serif"}`}>
      <Navbar />
      <div className="p-4">
        <Reader />
      </div>
      <NextChapterButton />
      <PreviousChapterButton />
    </main>
  )
}

export default App;
