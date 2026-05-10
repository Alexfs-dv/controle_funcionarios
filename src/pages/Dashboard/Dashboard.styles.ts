import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
`;

export const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justofy-conten: center;
  }
`;

export const StatCard = styled.div`
  flex: 1;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  box-shadown: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  h4 {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }

  p {
    font-size: 20px;
    font-weight: bold;
    color: #1976d2;
  }
`;

export const FiltersContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
  select,
  input {
    flex: 1;
  }
`;
