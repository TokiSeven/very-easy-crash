import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../store';

let offsetX = 0;
let isFirstTouch = true;

export const GameGraph: FC = () => {
  const { rate } = useAppSelector((s) => s.gameState);
  useEffect(() => {
    const canvas = document.getElementById('game') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (isFirstTouch) {
          ctx.beginPath();
          ctx.moveTo(0, canvas.height);
          isFirstTouch = false;
        }
        if (!rate) {
          ctx.restore();
          ctx.moveTo(0, canvas.height);
          offsetX = 0;
          isFirstTouch = true;
        } else {
          ctx.lineTo(offsetX, -rate * (canvas.height / 10) + canvas.height);
          ctx.stroke();
          offsetX += canvas.width / 35;
        }
      } else {
        isFirstTouch = true;
        offsetX = 0;
      }
    } else {
      isFirstTouch = true;
      offsetX = 0;
    }
  }, [rate]);
  return (
    <Layout>
      {!!rate && <Canvas id="game"></Canvas>}
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
  height: 300px;
`;

const Rate = styled.div`
  position: absolute;
  text-align: center;
`;

const Canvas = styled.canvas`
  height: 100%;
  width: 100%;
`;
