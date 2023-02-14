import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

export const PlayersList: FC<PropsWithChildren> = () => (
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
        <tr>
          <td>player #1</td>
          <td>5.54</td>
          <td>10.3</td>
          <td>0</td>
        </tr>
      </tbody>
    </Table>
  </Layout>
);

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
