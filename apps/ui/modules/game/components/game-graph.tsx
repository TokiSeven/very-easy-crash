import { FC } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../store';

export const GameGraph: FC = () => {
  const { state, secretNumber, rate } = useAppSelector((s) => s.gameState);
  return (
    <Layout>
      <Rate>{(rate || 0).toFixed(2)}x</Rate>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  padding: 0.5rem;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const Rate = styled.div``;
