import {produce} from 'immer';

export default function recipes(state = [], action) {
  switch (action.type) {
    case '@recipe/LOAD_SUCCESS':
      return action.recipes;
    case '@recipe/UPDATE':
      return produce(state, draft => {
        const recipe_id = draft.findIndex(p => p.id === action.item.id);

        if (recipe_id >= 0) {
          draft[recipe_id] = action.item;
        }
      });
    default:
      return state;
  }
}
