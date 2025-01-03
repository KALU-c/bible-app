import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./providers/theme-provider";
import { BookProvider } from "./providers/book-provider";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Editor from "./screens/editor";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <BookProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/editor" element={<Editor />} />
          </Routes>
          <Toaster />
        </BookProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
