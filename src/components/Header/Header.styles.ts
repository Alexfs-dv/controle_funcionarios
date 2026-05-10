import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #1976d2;
  color: white;
  border-radius: 6px;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 20px;

  a {
    color: white;
    text-decoration: none;
    font-weght: bold;

    &.active {
      color: #ffeb3b;
    }

    &: hover {
      text-decoration: underline;
    }
  }
`;

export const LogoutButton = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  span {
    font-weight: bold;
  }

  button {
    background: #d32f2f;
    color: #fff;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background: #b71c1c;
    }
  }
`;
