import { FC } from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { Components } from './components';
import { useEngine } from './engine';
import { store } from './store';

export const Game: FC = () => {
  useEngine();

  return (
    <Provider store={store}>
      <Components />
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="bottom-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
    </Provider>
  );
};
