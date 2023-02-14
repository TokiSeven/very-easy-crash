import { FC } from 'react';
import styled from 'styled-components';

export const GameGraph: FC = () => (
  <Layout>
    <Rate>{(1.56).toFixed(2)}x</Rate>
  </Layout>
);

const Layout = styled.div`
  display: flex;
  padding: 0.5rem;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const Rate = styled.div``;
