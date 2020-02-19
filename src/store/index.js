import {createStore} from 'redux';
import Reactotron from '../config/ReactotronConfig';

import rootReducer from './modules/rootReducer';

const store = createStore(rootReducer, Reactotron.createEnhancer());

export default store;
