import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ThemeProvider from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TopTrendingProvider from "./context/TopTrendingContext";
import GenersProvider from "./context/GenersContext";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TopTrendingProvider>
        <GenersProvider>
          <App />
        </GenersProvider>
      </TopTrendingProvider>
    </ThemeProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
