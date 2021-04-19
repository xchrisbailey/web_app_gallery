<template>
  <v-container>
    <ListApp v-for="app in apps" :key="app._id" :app="app"></ListApp>
    <v-btn v-if="hasMore" v-on:click="loadSome()" color="primary" text :loading="loading">
      load more
    </v-btn>
    <v-alert type="error" v-if="error">
      {{ error }}
    </v-alert>
  </v-container>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  button {
    margin: 12px auto;
    grid-column: 1 / -1;
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import ListApp from "@/components/ListApp.vue";
import { isCategory, WebApp } from "@/types";
import { WebAppQuery } from "@/services/webAppApi";

export default Vue.extend({
  name: "AppList",
  components: {
    ListApp
  },
  data: () => ({
    appsQuery: null as WebAppQuery | null,
    apps: [] as WebApp[],
    loading: true,
    hasMore: true,
    error: undefined as string | undefined
  }),
  created: function() {
    this.init();
  },
  methods: {
    init() {
      const category = isCategory(this.$route.params.category) ? this.$route.params.category : undefined;
      this.appsQuery = new WebAppQuery(category, 12);
      console.log(this.$route.params.category);
      this.apps = this.appsQuery.getApps();
      this.hasMore = true;
      this.loadSome();
    },
    loadSome() {
      this.loading = true;
      (this.appsQuery as WebAppQuery)
        .getMore()
        .then(() => {
          this.hasMore = (this.appsQuery as WebAppQuery).hasNextPage();
        })
        .catch(error => {
          this.error = error;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  watch: {
    $route() {
      this.init();
    }
  }
});
</script>
