<template>
  <q-dialog v-model="icon" class="Lato">
    <q-card style="width: 450px">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <div class="col-12 text-right" >
          <q-btn outline icon="close" color="grey" round dense v-close-popup />
        </div>

        <q-img
          v-if="details && details.img"
          style="width: 200px"
          :src="details.img"
        />
      </q-card-section>

      <q-card-section class="text-h6">
        <div><strong>Name:</strong> {{ details ? details.name : "" }}</div>
        <q-separator />
        <div><strong>Weight:</strong> {{ details ? details.weight : "" }}</div>
        <q-separator />
        <div><strong>Height:</strong> {{ details ? details.height : "" }}</div>
        <q-separator />
        <div><strong>Types:</strong> {{ details ? details.types : "" }}</div>
        <q-separator />
      </q-card-section>
      <q-card-actions>
        <div class="col-8">
          <q-btn
            class="myButton"
            rounded
            style="width: 100%"
            label="Share to my friends"
            color="primary"
            @click="copyClipboard()"
          />
        </div>
        <div class="col-4 text-right q-pr-lg">
          <q-btn
            :class="calculateClassButton(actualItem.selected)"
            round
            icon="star"
            @click="addFavorite(actualIndex)"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <div style="width: 600px; height: 100%" class="row q-col-gutter-md">
    <div class="col-12 header">
      <q-input
        class="q-ma-md header"
        v-model.trim="filter"
        outlined
        label="Search"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <div
      class="flex flex-center"
      style="font-size: 36px"
      v-if="itemsFilter && itemsFilter.length == 0"
    >
      Uh-oh!
      <div style="font-size: 20px" class="text-weight-light">
        You look lost on your journey!
      </div>
      <q-btn
        class="myButton q-mt-md"
        rounded
        style="width: 155px"
        label="Go back home"
        color="primary"
        @click="goHome()"
      />
    </div>
    <div class="col-12 container">
      <q-infinite-scroll @load="onLoad">
        <span v-for="(item, index) in itemsFilter" :key="index">
          <q-item v-if="tab == 1" class="q-mx-md q-mb-sm item">
            <q-item-section
              class="cursor-pointer"
              @click="goDetails(item, index)"
            >
              {{ item.name }}
            </q-item-section>
            <q-item-section avatar>
              <q-btn
                :class="calculateClassButton(item.selected)"
                round
                icon="star"
                @click="addFavorite(index)"
              />
            </q-item-section>
          </q-item>
          <q-item v-if="tab == 2 && item.selected" class="q-mx-md q-mb-sm item">
            <q-item-section>
              {{ item.name }}
            </q-item-section>
            <q-item-section avatar>
              <q-btn
                :class="calculateClassButton(item.selected)"
                round
                icon="star"
                @click="addFavorite(index)"
              />
            </q-item-section>
          </q-item>
        </span>
        <template v-if="tab == 1" v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </div>
    <div class="col-12 bg-white q-pa-md fixed-bottom footer shadow-3 row">
      <div class="col-6 text-right q-pr-md">
        <q-btn
          icon="list"
          :color="setColorAll()"
          class="myButton"
          rounded
          label="All"
          @click="setTab(1)"
        />
      </div>
      <div class="col-6 text-left q-pl-md">
        <q-btn
          icon="star"
          :color="setColorFavorite()"
          class="myButton"
          rounded
          @click="setTab(2)"
          label="Favorites"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { copyToClipboard } from "quasar";
import { ref } from "vue";

export default {
  // name: 'ComponentName',
  watch: {
    filter: {
      handler: "filterAutocomplete",
    },
  },
  computed: {
    items() {
      return this.$store.getters["pokemon/getPokemones"];
    },
    tab() {
      return this.$store.getters["pokemon/getSelectedTab"];
    },
    filter: {
      get() {
        return this.$store.getters["pokemon/getFilter"];
      },
      set(value) {
        this.$store.dispatch("pokemon/setFilter", value);
      },
    },
  },
  mounted() {
    this.filterAutocomplete();
  },
  methods: {
    copyClipboard() {
      copyToClipboard(`${this.details.name}, ${this.details.types}`)
        .then(() => {
          this.$q.notify({
            message: "Copy to clipboard",
            type: "positive",
          });
        })
        .catch(() => {
          // fail
        });
    },
    filterAutocomplete() {
      if (this.filter == "") {
        this.itemsFilter = this.items;
      } else {
        const auxItems = this.items;
        this.itemsFilter = auxItems.filter((e) => e.name.includes(this.filter));
      }
    },
    setColorAll() {
      if (this.tab == 1) {
        return "primary";
      }
      return "grey";
    },
    setColorFavorite() {
      if (this.tab == 1) {
        return "grey";
      }
      return "primary";
    },
    async onLoad(index, done) {
      if (this.tab == 1) {
        await this.$store.dispatch("pokemon/obtenerPokemones");
        this.itemsFilter = this.items;
      }
      done();
    },
    async goDetails(item, index) {
      this.icon = true;
      this.actualIndex = index;
      this.actualItem = item;
      this.details = await this.$store.dispatch(
        "pokemon/obtenerPokemon",
        item.name
      );
      console.log(this.details);
    },
    goHome() {
      this.filter = "";
      this.$router.push("/");
    },
    setTab(value) {
      this.$store.dispatch("pokemon/setSelectedTab", value);
    },
    addFavorite(index) {
      this.$store.dispatch("pokemon/setFavorite", index);
    },
    calculateClassButton(selected) {
      if (selected) {
        return "favorite";
      } else {
        return "noFavorite";
      }
    },
  },
  setup() {
    return {
      itemsFilter: null,
      icon: ref(false),
      details: null,
      actualIndex: null,
      actualItem: null,
    };
  },
};
</script>
<style lang="scss" scoped>
.favorite {
  color: $amber;
}
.noFavorite {
  color: $grey;
}
.item {
  font-size: 22px;
  border: 1px solid $grey-3;
  border-radius: 5px;
  background-color: #ffffff;
}
.footer {
  background-color: red;
}
.container {
  height: 600px;
}
.header {
}
.myButton {
  width: 150px;
  height: 44px;
}
</style>
