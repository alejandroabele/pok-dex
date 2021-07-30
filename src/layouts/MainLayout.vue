<template>
  <q-layout view="lHh Lpr lFf" class="Lato">
    <q-header elevated>
      <q-toolbar>
      
        <q-toolbar-title class="text-center text-h4"> Pokédex </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container class="container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>


import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
  },

  setup() {

    return {

    };
  },
});
</script>
<style lang="scss" scoped>
.container {
  background-color: $grey-1;
}
</style>
