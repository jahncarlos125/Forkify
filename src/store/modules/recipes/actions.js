export function loadRecipesRequest(term) {
  return {
    type: '@recipe/LOAD_REQUEST',
    term,
  };
}

export function loadRecipesSuccess(recipes) {
  return {
    type: '@recipe/LOAD_SUCCESS',
    recipes,
  };
}
