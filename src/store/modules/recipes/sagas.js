import {call, put, select, all, takeLatest} from 'redux-saga/effects';
import api from '../../../services/api';
import {loadRecipesSuccess, loadRecipesFailed} from './actions';
import {addLoading, removeLoading} from '../globals/actions';

function* fetchData({term}) {
  try {
    yield put(addLoading());
    const {data} = yield call(api.get, `/search?q=${term}`);
    const getFavorites = state => state.favorites;
    const favorites = yield select(getFavorites);

    if (data.count) {
      let r = data.recipes.map(item => {
        const isFav = favorites.find(x => {
          return x.id === item.recipe_id;
        });

        return {
          id: item.recipe_id,
          title: item.title,
          avatar: item.image_url.replace('http', 'https'),
          publisher: item.publisher,
          favorite: isFav ? true : false,
        };
      });

      yield put(loadRecipesSuccess(r));
    }
  } catch (error) {
    yield put(loadRecipesFailed(error.message));
  } finally {
    yield put(removeLoading());
  }
}

export default all([takeLatest('@recipe/LOAD_REQUEST', fetchData)]);
