import { FC } from 'react';
import styled from 'styled-components';

export const GameControllers: FC = () => (
  <Layout
    onSubmit={(e) => {
      e.preventDefault();
    }}
  >
    <label htmlFor="guessed-number">Guess a number:</label>
    <Input id="guessed-number" type="number" />
    <BetBtn type="submit">Bet</BetBtn>
  </Layout>
);

const Layout = styled.form`
  border-right: 1px solid black;
  padding: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid black;
`;

const BetBtn = styled.button`
  width: 100%;
  background-color: white;
  color: black;
  border: 1px solid black;
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    background-color: #aaa;
  }
`;
