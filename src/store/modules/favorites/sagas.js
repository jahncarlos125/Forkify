import {put, select, all, takeLatest} from 'redux-saga/effects';
import {addFavoriteSuccess, removeFavoriteSuccess} from './actions';
import {updateRecipe} from '../recipes/actions';

function* addFavorite({item}) {
  const getRecipes = state => state.recipes;
  const {recipes} = yield select(getRecipes);

  //Muda status de favorito na lista de receitas
  let recipe_id = recipes.findIndex(r => r.id === item.id);

  let recipe = {
    id: recipes[recipe_id].id,
    title: recipes[recipe_id].title,
    avatar: recipes[recipe_id].avatar,
    publisher: recipes[recipe_id].publisher,
    favorite: true,
  };

  yield put(addFavoriteSuccess(item));

  yield put(updateRecipe(recipe));
}

function* removeFavorite({item}) {
  const getRecipes = state => state.recipes;
  const {recipes} = yield select(getRecipes);

  //Muda status de favorito na lista de receitas
  let recipe_id = recipes.findIndex(r => r.id === item.id);

  let recipe = {
    id: recipes[recipe_id].id,
    title: recipes[recipe_id].title,
    avatar: recipes[recipe_id].avatar,
    publisher: recipes[recipe_id].publisher,
    favorite: false,
  };

  yield put(removeFavoriteSuccess(item));

  yield put(updateRecipe(recipe));
}

export default all([
  takeLatest('@fav/ADD_REQUEST', addFavorite),
  takeLatest('@fav/REMOVE_REQUEST', removeFavorite),
]);
