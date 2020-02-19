export default function favorites(state = [], action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.item];
    case 'REMOVE_FAVORITE':
      return action.fav;
    default:
      return state;
  }
}
