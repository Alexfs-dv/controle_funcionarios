import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Funcionarios from "./pages/Funcionarios/Funcionarios";
import Cadastro from "./pages/Cadastro/Cadastro";
import Obras from "./pages/Obras/Obras";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { GlobalStyles } from "./GlobalStyles";
import PrivateRoute from "./components/PrivateRoute";
import Funcoes from "./pages/Funcoes/Funcoes";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/funcionarios"
          element={
            <PrivateRoute>
              <Funcionarios />
            </PrivateRoute>
          }
        />
        <Route
          path="/obras"
          element={
            <PrivateRoute>
              <Obras />
            </PrivateRoute>
          }
        />
        <Route
          path="/funcoes"
          element={
            <PrivateRoute>
              <Funcoes />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
