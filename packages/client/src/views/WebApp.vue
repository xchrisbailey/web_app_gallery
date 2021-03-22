<template>
  <v-card flat :loading="loading">
    <div class="d-flex flex-no-wrap">
      <v-avatar class="ma-3" rounded="xl" size="120" color="grey">
        <img :src="appData.icon.src" alt="" v-if="appData" />
      </v-avatar>
      <div>
        <v-card-title
          class="text-h4"
          v-text="(appData && appData.name) || ''"
        ></v-card-title>

        <v-card-actions class="pl-4 pr-4">
          <v-btn
            block
            color="primary"
            :href="appData && appData.startUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open App
          </v-btn>
        </v-card-actions>
      </div>
    </div>
    <v-card-text>
      <p>{{ (appData && appData.description) || "" }}</p>
      <v-rating
        length="5"
        :value="(appData && appData.averageRating) || 0"
        readonly
        half-increments
        dense
      />
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.v-card__title {
  word-break: unset;
}
</style>

<script lang="ts">
import { WebApp } from "@/types";
import Vue from "vue";
import { sampleApps } from "../sampleData";

export default Vue.extend({
  name: "WebApp",

  data: () => ({
    appData: null as WebApp | null,
    loading: true
  }),

  created: function() {
    setTimeout(() => {
      this.loading = false;
      this.appData = sampleApps[parseInt(this.$route.params.id)];
    }, 1_000);
  }
});
</script>
