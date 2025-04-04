import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProdutosPage from "./pages/ProdutosPage";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* Aqui você colocará a tela de produtos futuramente */}
        <Route path="/produtos" element={token ? <ProdutosPage /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />       
      </Routes>
    </Router>
  );
}

export default App;
