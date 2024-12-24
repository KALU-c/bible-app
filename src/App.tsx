import "./App.css";
import NextChapterButton from "./global/next-chapter-button";
import PreviousChapterButton from "./global/previous-chapter-button";
import Reader from "./pages/reader";
import Navbar from "./shared/navbar/navbar";

function App() {
  return (
    <main className="font-inter">
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
