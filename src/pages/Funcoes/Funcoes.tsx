import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { toast } from "react-toastify";
import {
  SectionHeader,
  Table,
  Th,
  Td,
  ActionCell,
  Button,
  EditButton,
  DeleteButton,
  ModalOverlay,
  ModalContent,
  CloseButton,
  Form,
  Label,
  Input,
  ButtonGroup,
  CancelButton,
  ConfirmButton,
} from "../Funcionarios/Funcionarios.styles";
import { Container } from "../Dashboard/Dashboard.styles";
import Header from "../../components/Header/Header";

export default function Funcoes() {
  const [funcoes, setFuncoes] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditeId] = useState<string | null>(null);
  const [nomeFuncao, setNomeFuncao] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "funcoes"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFuncoes(lista);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateDoc(doc(db, "funcoes", editId), { nome: nomeFuncao });
        toast.success("Função atualizada com sucesso!");
      } else {
        await addDoc(collection(db, "funcoes"), {
          nome: nomeFuncao,
          createdAt: new Date(),
        });
        toast.success("Função Cadastrada com sucesso!");
      }
      setNomeFuncao("");
      setShowModal(false);
      setEditeId(null);
    } catch (error) {
      toast.error("Erro ao salvar: " + error);
    }
  };

  const handleDeleteClick = (id: string) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await deleteDoc(doc(db, "funcoes", confirmDeleteId));
      toast.success("Função excluida com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir, tente novamente!");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const handleEdit = (funcao: any) => {
    setEditeId(funcao.id);
    setNomeFuncao(funcao.nome);
    setShowModal(true);
  };

  return (
    <Container>
      <Header />
      <SectionHeader>
        <h2>Cadastro de Funções</h2>
        <Button
          onClick={() => {
            setEditeId(null);
            setNomeFuncao("");
            setShowModal(true);
          }}
        >
          +Função
        </Button>
      </SectionHeader>

      <Table>
        <thead>
          <tr>
            <Th>Nome da Função</Th>
          </tr>
        </thead>
        <tbody>
          {funcoes.map((f) => (
            <tr key={f.id}>
              <Td>{f.nome}</Td>
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
                        <CancelButton onClick={() => setConfirmDeleteId(null)}>
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
          ))}
        </tbody>
      </Table>

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setShowModal(false)}>x</CloseButton>
            <h3>{editId ? "Editar Função" : "Cadastrar Função"}</h3>

            <Form onSubmit={handleSubmit}>
              <Label>
                Nome da Função
                <Input
                  type="text"
                  value={nomeFuncao}
                  onChange={(e) => setNomeFuncao(e.target.value)}
                  required
                />
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
