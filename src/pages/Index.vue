<template>
  <q-page padding>
    <div v-if="loading" class="q-mt-lg pokemon myImg"></div>

    <div v-if="!loading">
      <q-img class="myImg" src=~assets/pikachu.png />
      <div class="row q-mt-md">
        <div class="text-h4 col-12 text-center">Welcome to Pokédex</div>
        <div class="text-center text-subtitle1 text-grey-9 col-12">
          The digital encyclopedia created by Professor Oak is an invaluable
          tool to Trainers in the Pokémon world.
        </div>
        <div class="col-12 text-center">
          <q-btn
            class="myButton q-mt-md"
            rounded
            style="width: 155px"
            label="Get started"
            color="primary"
            @click="goHome()"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";

export default defineComponent({
  name: "PageIndex",
  methods: {
    goHome() {
      this.loading = true;
      setTimeout(() => {
        this.$router.push("home");
      }, 1500);
    },
  },
  setup() {
    return {
      loading: ref(false),
    };
  },
});
</script>
<style lang="scss" scoped>
.myImg {
  display: block;
  width: 200px;
  margin: auto;
}
.pokemon {
  position: relative;
  height: 100px;
  width: 100px;
  margin-top: 20%;
  background: linear-gradient(to bottom, rgb(254, 0, 1) 50%, white 50%);
  border-radius: 50%;
  border: 8px solid black;
  animation: spin 1s linear infinite;
}

/* Spin Animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
