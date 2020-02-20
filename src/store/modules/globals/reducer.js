import {produce} from 'immer';

export default function globals(state = {loading: false}, action) {
  switch (action.type) {
    case '@globals/ADD_LOADING':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@globals/REMOVE_LOADING':
      return produce(state, draft => {
        draft.loading = false;
      });
    default:
      return state;
  }
}
