import { FC } from 'react';
import styled from 'styled-components';
import { GameControllers } from './components/game-controllers';
import { GameGraph } from './components/game-graph';
import { Head } from './components/head';
import { PlayersList } from './components/players-list';

export const Game: FC = () => (
  <Layout>
    <Head />
    <ContentLayout>
      <GameControllers />
      <GameGraph />
    </ContentLayout>
    <PlayersList />
  </Layout>
);

const Layout = styled.div`
  background-color: #fff;
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  border-bottom: 1px solid black;
`;
