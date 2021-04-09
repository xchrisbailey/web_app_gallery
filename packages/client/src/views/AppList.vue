<template>
  <v-alert type="error" v-if="error">
    {{ error }}
  </v-alert>
  <div v-else>
    <ListApp v-for="app in apps" :key="app._id" :app="app"></ListApp>
    <p v-if="loading">loading</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ListApp from "@/components/ListApp.vue";
import { WebApp } from "@/types";
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
    error: undefined as string | undefined
  }),
  created: function() {
    this.init();
  },
  methods: {
    init() {
      this.appsQuery = new WebAppQuery(this.$route.params.category);
      console.log(this.$route.params.category);
      this.appsQuery
        .getMore()
        .then(apps => {
          this.loading = false;
          this.apps = apps;
        })
        .catch(error => {
          this.error = error;
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
