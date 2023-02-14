import { useEffect } from 'react';
import { Engine } from './engine';

export const engine = new Engine();

export const useEngine = () =>
  useEffect(() => {
    engine.connect();

    return () => {
      engine.disconnect();
    };
  }, []);
