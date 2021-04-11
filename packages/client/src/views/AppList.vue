<template>
  <v-alert type="error" v-if="error">
    {{ error }}
  </v-alert>
  <div v-else>
    <ListApp v-for="app in apps" :key="app._id" :app="app"></ListApp>
    <v-btn v-if="hasMore" id="load-more" v-on:click="loadSome()" color="primary" text :loading="loading">
      load more
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>
#load-more {
  display: block;
  margin: 12px auto;
}
</style>

<script lang="ts">
import Vue from "vue";
import ListApp from "@/components/ListApp.vue";
import { isCategory, WebApp } from "@/types";
import { WebAppQuery } from "@/services/api";

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
      this.appsQuery = new WebAppQuery(category);
      console.log(this.$route.params.category);
      this.apps = this.appsQuery.getApps();
      this.hasMore = true;
      this.loadSome();
    },
    loadSome() {
      this.loading = true;
      this.appsQuery
        .getMore()
        .then(apps => {
          this.hasMore = this.appsQuery.hasNextPage();
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
