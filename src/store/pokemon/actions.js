import Axios from "axios";
export async function obtenerPokemones({ commit, state }, value) {
  const response = await Axios.get(state.currentUrl);
  if (response && response.status === 200) {
    if (response.data) {
      const pokemonesMapped = response.data.results.map((e) => {
        return {
          name: e.name,
          url: e.url,
          selected: false,
        };
      });
      commit("setCurrentUrl", response.data.next);
      commit("setPokemones", pokemonesMapped);
    }
  }
}

export async function setFavorite({ commit, state }, index) {
  commit("setFavorite", index);
}

export async function setSelectedTab({ commit, state }, value) {
  commit("setSelectedTab", value);
}

export async function setFilter({ commit, state }, value) {
  commit("setFilter", value);
}

export async function obtenerPokemon({ commit, state }, value) {
  const response = await Axios.get(`${state.baseUrl}/${value}`);
  let data = {};
  if (response && response.data) {
    data.height = response.data.height;
    data.weight = response.data.weight;
    data.name = response.data.name;
    data.img = response.data.sprites.other["official-artwork"].front_default;
    if (response.data.types) {
      let auxTypes = "";
      const len = response.data.types.length;
      for (let i = 0; i < len; i++) {
        if (i + 1 == len) {
          auxTypes += response.data.types[i].type.name;
        } else {
          auxTypes = auxTypes + response.data.types[i].type.name + ", ";
        }
      }
      data.types = auxTypes;
    }
  }
  return data;
}
