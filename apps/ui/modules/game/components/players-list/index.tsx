import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../store';
import { PlayerRow } from './player-row';

export const PlayersList: FC<PropsWithChildren> = () => {
  const players = useAppSelector((s) => s.players.players);
  return (
    <Layout>
      <Table>
        <thead>
          <tr>
            <th>player</th>
            <th>guessed</th>
            <th>bet</th>
            <th>won</th>
          </tr>
        </thead>
        <tbody>
          {players.map((v) => (
            <PlayerRow key={v.id} {...v} />
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};

const Layout = styled.div`
  padding: 0.5rem;
  overflow: auto;
`;

const Table = styled.table`
  width: 100%;

  thead tr th {
    text-align: left;
  }
`;
