import React from 'react';
import {StatusBar} from 'react-native';

import '~/config/ReactotronConfig';

import Routes from '~/routes';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#4C3C82" />
      <Routes />
    </>
  );
};

export default App;
