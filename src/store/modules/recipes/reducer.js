export default function recipes(state = [], action) {
  switch (action.type) {
    case '@recipe/LOAD_SUCCESS':
      return action.recipes;
    case 'REMOVE_RECIPE':
      return action.fav;
    default:
      return state;
  }
}
