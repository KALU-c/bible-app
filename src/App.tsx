import "./App.css";
import { AppSidebar } from "./components/sidebar/app-sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { Toaster } from "./components/ui/toaster";
// import NextChapterButton from "./global/next-chapter-button";
// import PreviousChapterButton from "./global/previous-chapter-button";
import Reader from "./pages/reader";
import { useBookSetting } from "./providers/book-provider";
import Navbar from "./shared/navbar/navbar";

function App() {
  const { fontFamily } = useBookSetting();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className={`${fontFamily === "Inter" ? "font-inter" : "font-source-serif"}`}>
        <Navbar />
        <Reader />
        {/* <NextChapterButton /> */}
        {/* <PreviousChapterButton /> */}
      </main>
      <Toaster />
    </SidebarProvider>
  )
}

export default App;
