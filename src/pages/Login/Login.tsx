import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Container,
  Form,
  Input,
  Button,
  TextCenter,
  FormTitle,
} from "./Login.styled";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      toast.success("Login realizado com sucesso!");
      navigate("/dashboard"); //redireciona após login bem sucedido
    } catch (error) {
      toast.error("Ops! Algo deu errado. Verifique suas credenciais.");
    }
  };

  return (
    <Container>
      <FormTitle>Login</FormTitle>

      <Form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Button type="submit">Entrar</Button>
        <TextCenter>
          <Link to="/cadastro">Ainda Não tem Conta? Cadastre-se aqui!</Link>
        </TextCenter>
      </Form>
    </Container>
  );
}
