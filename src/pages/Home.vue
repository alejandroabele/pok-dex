<template>
  <q-page class="flex flex-center">
    <ListPokemon />
  </q-page>
</template>

<script>
import ListPokemon from "src/components/ListPokemon.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
  components: {
    ListPokemon,
  },
});
</script>
