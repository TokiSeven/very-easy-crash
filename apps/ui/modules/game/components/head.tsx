import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

export const Head: FC<PropsWithChildren> = () => (
  <Layout>Simple Crash Game</Layout>
);

const Layout = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid black;
`;
