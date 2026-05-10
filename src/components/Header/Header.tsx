import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate, NavLink } from "react-router-dom";
import { Container, Title, Nav, LogoutButton } from "./Header.styles";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <Container>
      <Title>Controle de Funcionários</Title>

      <Nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/Funcionarios">Funcionários</NavLink>
        <NavLink to="/obras">Obras</NavLink>
        <NavLink to="/funcoes">Funções</NavLink>
      </Nav>

      <LogoutButton>
        <button onClick={handleLogout}>Logout</button>
      </LogoutButton>
    </Container>
  );
}
