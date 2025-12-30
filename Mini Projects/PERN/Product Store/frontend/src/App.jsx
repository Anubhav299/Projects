import NavBar from "./components/NavBar.jsx";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage.jsx";

import { Routes, Route } from "react-router-dom";
import { useThemeStore } from "./store/useThemeStore.js";

function App() {
  const { theme } = useThemeStore();
  return (
    <div
      className="min-h-screen bg-base-200 transition-colors duration-300"
      data-theme={theme}
    >
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
