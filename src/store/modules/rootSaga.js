import {all} from 'redux-saga/effects';

import recipes from './recipes/sagas';

export default function* rootSaga() {
  return yield all([recipes]);
}
