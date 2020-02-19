export function addFavorite(item) {
  return {
    type: '@fav/ADD',
    item,
  };
}

export function removeFavorite(fav) {
  return {
    type: '@fav/REMOVE',
    fav,
  };
}
