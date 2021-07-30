export function setPokemones(state, value) {
  const arrayAux = [...state.pokemones, ...value];
  state.pokemones = arrayAux;
}

export function setCurrentUrl(state, value) {
  state.currentUrl = value;
}

export function setFavorite(state, index) {
  state.pokemones[index].selected = !state.pokemones[index].selected;
}

export function setSelectedTab(state, value) {
  state.selectedTab = value;
}

export function setFilter(state, value) {
  state.filter = value;
}

