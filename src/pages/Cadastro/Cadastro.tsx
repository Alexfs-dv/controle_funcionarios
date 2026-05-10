import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
} from "./Cadastro.styles";
import { Link } from "react-router-dom";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      toast.success("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao cadastrar usuário: " + error);
    }
  };

  return (
    <Container>
      <FormTitle>Cadastro de Usuário</FormTitle>

      <Form onSubmit={handleCadastro}>
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
        <Button type="submit">Cadastrar</Button>
        <TextCenter>
          <Link to="/">Já possui conta? Faça login!</Link>
        </TextCenter>
      </Form>
    </Container>
  );
}
