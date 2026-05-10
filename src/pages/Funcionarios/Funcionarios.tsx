import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  Form,
  Input,
  Button,
  ModalOverlay,
  ModalContent,
  CloseButton,
  SectionHeader,
  Table,
  Th,
  Td,
  Label,
  EditButton,
  DeleteButton,
  ActionCell,
  SearchInput,
  SearchWrapper,
  SearchIcon,
  SearchContainer,
  ButtonGroup,
  CancelButton,
  ConfirmButton,
  Select,
} from "./Funcionarios.styles";

import Header from "../../components/Header/Header";
import { Container } from "../Dashboard/Dashboard.styles";
import { toast } from "react-toastify";

export default function Funcionarios() {
  const [showModal, setShowModal] = useState(false);
  const [funcionarios, setFuncionarios] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [obras, setObras] = useState<any[]>([]);
  const [funcoes, setFuncoes] = useState<any[]>([]);

  const [nome, setNome] = useState("");
  const [funcao, setFuncao] = useState("");
  const [dataAdmissao, setDataAdmissao] = useState("");
  const [telefone, setTelefone] = useState("");
  const [obra, setObra] = useState("");
  //const [email, setEmail] = useState("");
  //const [status, setStatus] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "funcionarios"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFuncionarios(lista);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "obras"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setObras(lista);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "funcoes"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFuncoes(lista);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editId) {
        await updateDoc(doc(db, "funcionarios", editId), {
          nome,
          funcao,
          dataAdmissao,
          telefone,
          obra,
          //status,
        });
        toast.success("Funcionario atualizado com sucesso!");
      } else {
        await addDoc(collection(db, "funcionarios"), {
          nome,
          funcao,
          dataAdmissao,
          telefone,
          obra,
          //status,
          createdAt: new Date(),
        });
        toast.success("Funcionário adicionado com sucesso!");
      }
      setNome("");
      setFuncao("");
      setDataAdmissao("");
      setTelefone("");
      setObra("");
      setShowModal(false);
      setEditId(null);
      //setEmail("");
      //setStatus("");
    } catch (error) {
      toast.error("Erro ao adicioanar fucnionário. Tente novamente." + error);
    }
  };

  const formatTelefone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (!digits) return ""; // garante que vazio continua vazio

    if (digits.length <= 2) {
      return digits;
    }
    if (digits.length <= 6) {
      return digits.replace(/(\d{2})(\d{0,4})/, "($1) $2");
    }
    if (digits.length <= 10) {
      return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    }
    return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  };

  const handleDeleteClick = (id: string) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await deleteDoc(doc(db, "funcionarios", confirmDeleteId));
      toast.success("Funcionário excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir, tente novamente!");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const handleEdit = (funcionario: any) => {
    setEditId(funcionario.id);
    setNome(funcionario.nome);
    setFuncao(funcionario.funcao);
    setDataAdmissao(funcionario.dataAdmissao);
    setTelefone(funcionario.telefone);
    setObra(funcionario.obra);
    setShowModal(true);
  };

  const funcionariosFiltrados = funcionarios.filter((f) =>
    f.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Container>
      <Header />
      <SectionHeader>
        <h2>Cadastro de Funcionários</h2>
        <Button
          onClick={() => {
            setEditId(null);
            setNome("");
            setFuncao("");
            setDataAdmissao("");
            setTelefone("");
            setObra("");
            setShowModal(true);
          }}
        >
          + Funcionário
        </Button>
      </SectionHeader>

      <SearchContainer>
        <SearchWrapper>
          <SearchIcon></SearchIcon>
          <SearchInput
            type="text"
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>
      </SearchContainer>

      <Table>
        <thead>
          <tr>
            <Th>Nome</Th>
            <Th>Função</Th>
            <Th>Data de Admissão</Th>
            <Th>Telefone</Th>
            <Th>Obra</Th>
          </tr>
        </thead>
        <tbody>
          {funcionariosFiltrados.map((f) => {
            const dataFormatada = f.dataAdmissao
              ? new Date(f.dataAdmissao + "T00:00:00").toLocaleDateString(
                  "pt-BR",
                )
              : "";
            return (
              <tr key={f.id}>
                <Td>{f.nome}</Td>
                <Td>{f.funcao}</Td>
                <Td>{dataFormatada}</Td>
                <Td>{f.telefone}</Td>
                <Td>{f.obra}</Td>
                <ActionCell>
                  <EditButton onClick={() => handleEdit(f)}>Editar</EditButton>
                  <DeleteButton onClick={() => handleDeleteClick(f.id)}>
                    Excluir
                  </DeleteButton>

                  {confirmDeleteId && (
                    <ModalOverlay onClick={() => setConfirmDeleteId(null)}>
                      <ModalContent onClick={(e) => e.stopPropagation()}>
                        <h3>Confirmar Exclusão</h3>
                        <p>Tem certeza que deseja excluir este funcionário?</p>
                        <ButtonGroup>
                          <CancelButton
                            onClick={() => setConfirmDeleteId(null)}
                          >
                            Cancelar
                          </CancelButton>
                          <ConfirmButton onClick={confirmDelete}>
                            Sim, excluir
                          </ConfirmButton>
                        </ButtonGroup>
                      </ModalContent>
                    </ModalOverlay>
                  )}
                </ActionCell>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setShowModal(false)}>x</CloseButton>
            <h3>{editId ? "Editar Funcionário" : "Cadastrar Funcionário"}</h3>

            <Form onSubmit={handleSubmit}>
              <Label>
                Nome
                <Input
                  type="text"
                  placeholder="Digite o nome do funcionário"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </Label>

              <Label>
                Função
                <Select
                  value={funcao}
                  onChange={(e) => setFuncao(e.target.value)}
                  required
                >
                  <option value="">Selecione uma função</option>
                  {funcoes.map((f) => (
                    <option key={f.id} value={f.nome}>
                      {f.nome}
                    </option>
                  ))}
                </Select>
              </Label>
              <Label>
                Data de Admissão
                <Input
                  type="date"
                  value={dataAdmissao}
                  onChange={(e) => setDataAdmissao(e.target.value)}
                  required
                />
              </Label>

              <Label>
                Telefone
                <Input
                  type="tel"
                  placeholder="(99) 99999-9999"
                  value={telefone}
                  onChange={(e) => setTelefone(formatTelefone(e.target.value))}
                />
              </Label>

              <Label>
                Obra Atual
                <Select
                  value={obra}
                  onChange={(e) => setObra(e.target.value)}
                  required
                >
                  <option value="">Selecione uma obra</option>
                  {obras.map((o) => (
                    <option key={o.id} value={o.nome}>
                      {o.nome}
                    </option>
                  ))}
                </Select>
              </Label>
              <Button type="submit">
                {editId ? "Salvar Alterações" : "Cadastrar"}
              </Button>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
