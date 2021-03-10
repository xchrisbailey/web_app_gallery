<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <router-link to="/">
        <v-app-bar-title>Web App Gallery</v-app-bar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-text-field
        hide-details
        prepend-inner-icon="mdi-magnify"
        placeholder="Search"
        filled
        rounded
        dense
        single-line
      ></v-text-field>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <v-subheader>Catagories</v-subheader>
        <v-list-item
          color="primary"
          link
          v-for="(category, i) in catagories"
          :key="i"
          :to="category.route"
        >
          <v-list-item-icon>
            <v-icon>{{ category.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ category.name }}</v-list-item-title>
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
</style>

<script lang="ts">
import Vue from "vue";

// TODO make catagories dynamic
const catagories = [
  { name: "Games", icon: "mdi-google-controller", route: "/categories/games" },
  { name: "Social", icon: "mdi-account", route: "/categories/social" },
  { name: "Travel", icon: "mdi-train-car", route: "/categories/travel" },
  { name: "Utilities", icon: "mdi-tools", route: "/categories/utilities" },
  { name: "Music", icon: "mdi-music", route: "/categories/music" }
];

export default Vue.extend({
  name: "App",

  data: () => ({
    drawer: false,
    catagories
  })
});
</script>
