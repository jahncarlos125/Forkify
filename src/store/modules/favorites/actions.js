export function addFavoriteRequest(item) {
  return {
    type: '@fav/ADD_REQUEST',
    item,
  };
}

export function addFavoriteSuccess(item) {
  return {
    type: '@fav/ADD_SUCCESS',
    item,
  };
}

export function removeFavoriteRequest(item) {
  return {
    type: '@fav/REMOVE_REQUEST',
    item,
  };
}

export function removeFavoriteSuccess(item) {
  return {
    type: '@fav/REMOVE_SUCCESS',
    item,
  };
}
