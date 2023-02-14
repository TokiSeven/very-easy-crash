import { FC } from 'react';
import styled from 'styled-components';
import { GameControllers } from './game-controllers';
import { GameGraph } from './game-graph';
import { Head } from './head';
import { PlayersList } from './players-list';

export const Components: FC = () => (
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
