import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./providers/theme-provider";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/sidebar/app-sidebar";
import { BookProvider } from "./providers/book-provider";
import { Toaster } from "./components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BookProvider>
        <SidebarProvider>
          <AppSidebar />
          <App />
          <Toaster />
        </SidebarProvider>
      </BookProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
