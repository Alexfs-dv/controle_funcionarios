import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export const Button = styled.button`
  background-color: #1976d2;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 16px;

  &:hover {
    background-color: #1565c0;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  position: relative;
  background: #fff;
  padding: 20px;
  border-radius: 6px;
  width: 400px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #d32f2f;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const Th = styled.th`
  text-align: left;
  padding: 10px;
  background: transparent;
  color: #000;
`;

export const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
`;

export const EditButton = styled.button`
  background-color: #1976d2; /* azul */
  color: white;
  border: none;
  padding: 6px 12px;
  margin-right: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;

  &:hover {
    background-color: #115293;
  }
`;

export const DeleteButton = styled.button`
  background-color: #d32f2f; /* vermelho */
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;

  &:hover {
    background-color: #9a0007;
  }
`;

export const ActionCell = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px; /* espaço entre os botões */
  padding: 10px;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 250px;
  /*align-self: flex-start; garante alinhamento à esquerda */
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px 32px 8px 32px; /*espaço para o ícone*/
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  font-size: 16px;
  pointer-events: none; /*não atrapalha o clique no input*/
`;

export const ConfirmButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

export const CancelButton = styled.button`
  background-color: #bdc3c7;
  color: #333;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #95a5a6;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  borade-radius: 4px;
  font-size: 14px;
  background-color: #fff;
  color: #333;
  appearence: none; /*remove estilo padrão do navegador*/
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff; /*azul igual ao foco dos inputs*/
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;
