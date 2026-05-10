import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import {
  Container,
  StatsRow,
  StatCard,
  FiltersContainer,
} from "./Dashboard.styles";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import {
  Label,
  Table,
  Th,
  Td,
  Select,
  Input,
} from "../Funcionarios/Funcionarios.styles";

export default function Dashboard() {
  const [funcionarios, setFuncionarios] = useState<any[]>([]);
  const [obras, setObras] = useState<any[]>([]);
  const [funcoes, setFuncoes] = useState<any[]>([]);
  const [obraFiltro, setObraFiltro] = useState("");
  const [funcaoFiltro, setFuncaoFiltro] = useState("");
  const [buscaNome, setBuscaNome] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 20;

  useEffect(() => {
    const unsubFunc = onSnapshot(collection(db, "funcionarios"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFuncionarios(lista);
    });

    const unsubObras = onSnapshot(collection(db, "obras"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setObras(lista);
    });

    const unsubFuncoes = onSnapshot(collection(db, "funcoes"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFuncoes(lista);
    });

    return () => {
      unsubFunc();
      unsubObras();
      unsubFuncoes();
    };
  }, []);

  const funcionariosFiltrados = funcionarios
    .filter((f) => (obraFiltro ? f.obra === obraFiltro : true))
    .filter((f) => (funcaoFiltro ? f.funcao === funcaoFiltro : true))
    .filter((f) =>
      buscaNome
        ? f.nome?.toLowerCase().includes(buscaNome.toLowerCase())
        : true,
    );

  const indexUltimo = paginaAtual * itensPorPagina;
  const indexPrimeiro = indexUltimo - itensPorPagina;
  const funcionariosPagina = funcionariosFiltrados.slice(
    indexPrimeiro,
    indexUltimo,
  );

  const totalPaginas = Math.ceil(funcionariosFiltrados.length / itensPorPagina);

  return (
    <Container>
      <Header />

      <StatsRow>
        <StatCard>
          <h4>Obras</h4>
          <p>{obras.length}</p>
        </StatCard>
        <StatCard>
          <h4>Funcionários</h4>
          <p>{funcionarios.length}</p>
        </StatCard>
        <StatCard>
          <h4>Func. Ativos</h4>
          <p>20</p>
        </StatCard>
        <StatCard>
          <h4>Func. Inativos</h4>
          <p>5</p>
        </StatCard>
      </StatsRow>

      <FiltersContainer>
        <Label>
          Filtrar por obra
          <Select
            value={obraFiltro}
            onChange={(e) => setObraFiltro(e.target.value)}
          >
            <option value="">Todas</option>
            {obras.map((o) => (
              <option key={o.id} value={o.nome}>
                {o.nome}
              </option>
            ))}
          </Select>
        </Label>

        <Label>
          Filtrar por função
          <Select
            value={funcaoFiltro}
            onChange={(e) => setFuncaoFiltro(e.target.value)}
          >
            <option value="">Todas</option>
            {funcoes.map((f) => (
              <option key={f.id} value={f.nome}>
                {f.nome}
              </option>
            ))}
          </Select>
        </Label>

        <Label>
          Buscar por nome
          <Input
            type="text"
            placeholder="Buscar por..."
            value={buscaNome}
            onChange={(e) => setBuscaNome(e.target.value)}
          />
        </Label>
      </FiltersContainer>

      <Table>
        <thead>
          <tr>
            <Th>Nome</Th>
            <Th>Função</Th>
            <Th>Obra</Th>
          </tr>
        </thead>
        <tbody>
          {funcionariosPagina.map((f) => (
            <tr key={f.id}>
              <Td>{f.nome}</Td>
              <Td>{f.funcao}</Td>
              <Td>{f.obra}</Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Paginação */}
      <div style={{ marginTop: "16px" }}>
        <button
          disabled={paginaAtual === 1}
          onClick={() => setPaginaAtual(paginaAtual - 1)}
        >
          Anterior
        </button>
        <span>
          {" "}
          Página {paginaAtual} de {totalPaginas}{" "}
        </span>
        <button
          disabled={paginaAtual === totalPaginas}
          onClick={() => setPaginaAtual(paginaAtual + 1)}
        >
          Próxima
        </button>
      </div>
    </Container>
  );
}
