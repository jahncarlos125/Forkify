import produce from 'immer';

export default function favorites(state = [], action) {
  switch (action.type) {
    case '@fav/ADD_SUCCESS':
      return produce(state, draft => {
        const favorite_id = draft.findIndex(p => p.id === action.item.id);

        if (favorite_id === -1) {
          draft.push(action.item);
        }
      });
    case '@fav/REMOVE_SUCCESS':
      return produce(state, draft => {
        const recipe_id = draft.findIndex(p => p.id === action.item.id);

        if (recipe_id >= 0) {
          draft.splice(recipe_id, 1);
        }
      });
    default:
      return state;
  }
}
