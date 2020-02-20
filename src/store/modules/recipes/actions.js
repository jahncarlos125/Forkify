export function loadRecipesRequest(term) {
  return {
    type: '@recipe/LOAD_REQUEST',
    term,
  };
}

export function updateRecipe(item) {
  return {
    type: '@recipe/UPDATE',
    item,
  };
}

export function loadRecipesSuccess(recipes) {
  return {
    type: '@recipe/LOAD_SUCCESS',
    recipes,
  };
}
