import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import UpdatePage from "./pages/UpdatePage";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

function App() {
  return (
    <RestaurantsContextProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
        <Route path="/restaurants/:id/update" element={<UpdatePage />} />
      </Routes>
    </RestaurantsContextProvider>
  );
}

export default App;
