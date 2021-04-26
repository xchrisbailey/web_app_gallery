<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <router-link to="/">
        <v-app-bar-title>Web App Gallery</v-app-bar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-text-field
        class="search"
        hide-details
        prepend-inner-icon="mdi-magnify"
        placeholder="Search"
        filled
        rounded
        dense
        single-line
        color="white"
        enterkeyhint="search"
        clearable
        v-model="query"
        v-on:keyup.enter="search"
        v-on:click:clear="clearSearch"
      ></v-text-field>
    </v-app-bar>
    <div class="statusbar primary"></div>

    <v-navigation-drawer app v-model="drawer">
      <v-list>
        <v-list-item color="primary" link :to="'/profile'">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>My Account</v-list-item-title>
        </v-list-item>
        <v-subheader>Catagories</v-subheader>
        <v-list-item
          color="primary"
          link
          v-for="[category, { name, icon }] in catagories.entries()"
          :key="category"
          :to="'/categories/' + category"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ name }}</v-list-item-title>
        </v-list-item>
        <v-spacer></v-spacer>
        <v-list-item color="primary" link :to="'/apps/submit'">
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Submit New App</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
.v-app-bar-title {
  color: white;
  margin-right: 12px;
}
.search {
  max-width: 300px;
}
.v-list {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  > * {
    flex: 0;
  }
  .spacer {
    min-height: 96px;
  }
}

.statusbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: env(safe-area-inset-top) !important;
  z-index: 5;
}
header {
  margin-top: env(safe-area-inset-top) !important;
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
nav {
  width: calc(env(safe-area-inset-left) + 256px) !important;
  .v-list {
    padding-top: calc(env(safe-area-inset-top) + 8px);
    padding-bottom: max(env(safe-area-inset-bottom), 8px);

    .v-subheader {
      margin-top: 24px;
    }

    .v-list-item,
    .v-subheader {
      padding-left: max(env(safe-area-inset-left), 16px);
    }
  }
}
main {
  margin-top: env(safe-area-inset-top);
  margin-bottom: env(safe-area-inset-bottom);
  margin-left: env(safe-area-inset-left);
  margin-right: env(safe-area-inset-right);
}
</style>

<script lang="ts">
import Vue from "vue";
import { Category } from "./types";

// TODO make catagories dynamic
const catagories = new Map<Category | "submit", { name: string; icon: string }>([
  ["games", { name: "Games", icon: "mdi-google-controller" }],
  ["social", { name: "Social", icon: "mdi-account" }],
  ["travel", { name: "Travel", icon: "mdi-train-car" }],
  ["utilities", { name: "Utilities", icon: "mdi-tools" }],
  ["music", { name: "Music", icon: "mdi-music" }],
  ["news", { name: "News", icon: "mdi-newspaper" }],
  ["shopping", { name: "Shopping", icon: "mdi-shopping" }]
]);

export default Vue.extend({
  name: "App",

  data: () => ({
    drawer: null,
    catagories,
    query: ""
  }),

  methods: {
    search() {
      if (this.query) {
        this.$router.push(`/?search=${this.query}`);
      } else {
        this.$router.push("/");
      }
    },
    clearSearch() {
      this.query = "";
      this.search();
    }
  },

  beforeCreate() {
    const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    this.$vuetify.theme.dark = darkMediaQuery.matches;
    darkMediaQuery.addEventListener("change", event => {
      this.$vuetify.theme.dark = event.matches;
    });
  }
});
</script>
