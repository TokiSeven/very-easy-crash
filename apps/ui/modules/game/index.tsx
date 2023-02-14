import { FC } from 'react';
import { Provider } from 'react-redux';
import { Components } from './components';
import { useEngine } from './engine';
import { store } from './store';

export const Game: FC = () => {
  useEngine();

  return (
    <Provider store={store}>
      <Components />
    </Provider>
  );
};
