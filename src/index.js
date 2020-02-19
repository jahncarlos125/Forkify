import React from 'react';
import {StatusBar} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

import '~/config/ReactotronConfig';

import Routes from '~/routes';
import {store, persistor} from './store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar backgroundColor="#4C3C82" />
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
