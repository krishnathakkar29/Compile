import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "./pages/Home";
import Compile from "./pages/Compile";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";

//react split
function App() {
  return (
    <>
    <Toaster position="bottom-right" theme="dark" />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compiler" element={<Compile />} />
          <Route path="/compiler/:urlId" element={<Compile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
      </ThemeProvider>
    </>
  );
}

export default App;
