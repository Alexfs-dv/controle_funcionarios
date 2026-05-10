import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import {
  onSnapshot,
  collection,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import Header from "../../components/Header/Header";
import { Container } from "../Dashboard/Dashboard.styles";
import {
  SectionHeader,
  Button,
  Table,
  Th,
} from "../Funcionarios/Funcionarios.styles";
import {
  Td,
  ActionCell,
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

export default function Obras() {
  const [showModal, setShowModal] = useState(false);
  const [obras, setObras] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [local, setLocal] = useState("");
  const [dataInicio, setDataInicio] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "obras"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setObras(lista);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateDoc(doc(db, "obras", editId), {
          codigo,
          nome,
          local,
          dataInicio,
        });
        toast.success("Obra atualizada com sucesso!");
      } else {
        await addDoc(collection(db, "obras"), {
          codigo,
          nome,
          local,
          dataInicio,
          createAt: new Date(),
        });
        toast.success("Obra adicionada com sucesso!");
      }
      setCodigo("");
      setNome("");
      setLocal("");
      setDataInicio("");
      setShowModal(false);
      setEditId(null);
    } catch (error) {
      toast.error("Erro ao salvar obra, tente novamente!");
    }
  };

  const handleEdit = (obra: any) => {
    setEditId(obra.id);
    setCodigo(obra.codigo);
    setNome(obra.nome);
    setLocal(obra.local);
    setDataInicio(obra.dataInicio);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await deleteDoc(doc(db, "obras", confirmDeleteId));
      toast.success("Funcionário excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir, tente novamente!");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setConfirmDeleteId(id);
  };

  return (
    <Container>
      <Header />
      <SectionHeader>
        <h2>Cadastro de Obras</h2>
        <Button
          onClick={() => {
            setEditId(null);
            setNome("");
            setLocal("");
            setDataInicio("");
            setShowModal(true);
          }}
        >
          + Obras
        </Button>
      </SectionHeader>

      <Table>
        <thead>
          <tr>
            <Th>Cód.</Th>
            <Th>Nome</Th>
            <Th>Cidade/UF</Th>
            <Th>Data Inicio</Th>
          </tr>
        </thead>
        <tbody>
          {obras.map((o) => (
            <tr key={o.id}>
              <Td>{o.codigo}</Td>
              <Td>{o.nome}</Td>
              <Td>{o.local}</Td>
              <Td>{o.dataInicio}</Td>
              <ActionCell>
                <EditButton onClick={() => handleEdit(o)}>Editar</EditButton>
                <DeleteButton onClick={() => handleDeleteClick(o.id)}>
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
            <h3>{editId ? "Editar Obra" : "Cadastrar Obra"}</h3>
            <Form onSubmit={handleSubmit}>
              <Label>
                Código da Obra
                <Input
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  required
                />
              </Label>
              <Label>
                Nome
                <Input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </Label>
              <Label>
                Cidade/UF
                <Input
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  required
                />
              </Label>
              <Label>
                Data Inicio
                <Input
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
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
