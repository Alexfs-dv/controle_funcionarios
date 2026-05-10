import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

export const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #fff;
  padding: 50px 30px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 15px;
`;

export const Button = styled.button`
  padding: 14px;
  background: #1976d2;
  color: #fff;
  border: none;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background: #1565c0;
  }
`;

export const TextCenter = styled.p`
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
  color: #555;

  &:hover {
    color: #1976d2;
    text-decoration: underline;
  }
`;

export const FormTitle = styled.h2`
  margin-bottom: 20px;
  color: #555;
`;
