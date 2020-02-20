import {combineReducers} from 'redux';
import favorites from './favorites/reducer';
import recipes from './recipes/reducer';
import globals from './globals/reducer';

export default combineReducers({
  globals,
  favorites,
  recipes,
});
