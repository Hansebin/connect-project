import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;

export const MainText = styled.h1`
  margin-bottom: 5px;

  font-size: 25px;
  font-weight: 600;
  color: #2bae66;
`;

export const Text = styled.p`
  font-size: 15px;
  color: rgba(17, 17, 17, 0.5);
`;

export const Btn = styled.button`
  padding: 10px 20px;

  font-size: 15px;
  font-weight: 500;
  color: white;

  border: none;
  border-radius: 50px;

  background-color: #2bae66;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
