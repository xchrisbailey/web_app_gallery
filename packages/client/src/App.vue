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
      ></v-text-field>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer">
      <v-list>
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
    catagories
  })
});
</script>
