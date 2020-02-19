import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';

import '~/config/ReactotronConfig';

import Routes from '~/routes';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#4C3C82" />
      <Routes />
    </Provider>
  );
};

export default App;
