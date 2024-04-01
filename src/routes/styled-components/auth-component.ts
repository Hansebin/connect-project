import styled from "styled-components";

export const Container = styled.div`
  width: 450px;
  padding: 50px 80px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  border-radius: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  margin-bottom: 15px;

  font-size: 15px;
  font-weight: 500;

  background-color: #2bae6630;
  color: #111111;

  border: none;
  border-radius: 10px;

  &:focus {
    outline: none;
    border: 2px solid #2bae66;
  }
`;

export const InputButton = styled.input`
  width: 100%;
  padding: 15px 20px;
  margin-top: 10px;

  font-size: 18px;
  font-weight: 700;

  background-color: #2bae66;
  color: white;

  border: none;
  border-radius: 10px;

  transition: all 0.25s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #2bae6690;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 15px 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border: 1px solid #2bae66;
  border-radius: 10px;
`;
