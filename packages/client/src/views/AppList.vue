<template>
  <v-container>
    <ListApp v-for="app in appsQuery.apps" :key="app._id" :app="app"></ListApp>
    <v-btn v-if="appsQuery.hasNextPage" v-on:click="loadMore()" color="primary" text :loading="appsQuery.loading">
      load more
    </v-btn>
    <v-alert class="mb-0 sticky" type="error" v-if="appsQuery.error">
      {{ appsQuery.error }}
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

  .v-alert {
    grid-column: 1 / -1;
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import ListApp from "@/components/ListApp.vue";
import { Category, isCategory, WebApp } from "@/types";
import { WebAppQuery } from "@/services/webAppApi";

export default Vue.extend({
  name: "AppList",
  metaInfo: {
    title: "Web App Gallery",
    titleTemplate: undefined
  },
  components: {
    ListApp
  },
  data: () => ({
    appsQuery: new WebAppQuery(24)
  }),
  created: function() {
    this.init();
  },
  methods: {
    init() {
      this.appsQuery.settings = { category: this.category, search: this.search };
    },
    loadMore() {
      this.appsQuery.getMore();
    }
  },
  computed: {
    category(): Category | undefined {
      return isCategory(this.$route.params.category) ? this.$route.params.category : undefined;
    },
    search(): string | undefined {
      return typeof this.$route.query.search === "string" ? this.$route.query.search : undefined;
    }
  },
  watch: {
    $route() {
      this.init();
    }
  }
});
</script>
