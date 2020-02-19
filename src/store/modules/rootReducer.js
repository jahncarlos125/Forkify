import {combineReducers} from 'redux';
import favorites from './favorites/reducer';
import recipes from './recipes/reducer';

export default combineReducers({
  favorites,
  recipes,
});
