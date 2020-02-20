import {all} from 'redux-saga/effects';

import recipes from './recipes/sagas';
import favorites from './favorites/sagas';

export default function* rootSaga() {
  return yield all([recipes, favorites]);
}
