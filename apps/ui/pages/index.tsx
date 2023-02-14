import { Game } from '../modules/game';
import styled from 'styled-components';
import { device } from '../modules/game/css-utils/device';
import { ErrorBoundary } from '../modules/error-boundary';

export function Index() {
  return (
    <Layout>
      <ErrorBoundary>
        <Game />
      </ErrorBoundary>
    </Layout>
  );
}

export default Index;

const Layout = styled.div`
  border: 1px solid black;
  margin: 1rem;
  box-shadow: 0 5px 50px 0 black;

  @media ${device.tablet} {
    width: 600px;
    margin: auto;
    margin-top: 3rem;
  }
`;
