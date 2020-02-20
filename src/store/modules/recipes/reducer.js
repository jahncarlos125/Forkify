import {produce} from 'immer';

export default function recipes(state = {error: '', recipes: []}, action) {
  switch (action.type) {
    case '@recipe/LOAD_SUCCESS':
      return produce(state, draft => {
        draft.recipes = action.recipes;
        draft.error = '';
      });
    case '@recipe/LOAD_FAILED':
      return produce(state, draft => {
        draft.recipes = [];
        draft.error = action.error;
      });
    case '@recipe/UPDATE':
      return produce(state, draft => {
        const recipe_id = draft.recipes.findIndex(p => p.id === action.item.id);

        if (recipe_id >= 0) {
          draft.recipes[recipe_id] = action.item;
        }
      });
    default:
      return state;
  }
}
