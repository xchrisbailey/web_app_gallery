<template>
  <v-card flat :loading="loading">
    <div class="d-flex flex-no-wrap">
      <v-avatar
        class="ma-3"
        rounded="xl"
        size="120"
        color="grey"
        :class="{ maskable: appData && appData.icon.purpose == 'maskable' }"
      >
        <img :src="appData.icon.src" alt="" v-if="appData" />
      </v-avatar>
      <div class="name-and-photo">
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

.maskable img {
  width: 110%;
  height: 110%;
}

@media (min-width: 600px) {
  .name-and-photo {
    display: flex;
    flex-grow: 1;

    @media (max-width: 800px) {
      justify-content: space-between;
    }

    .v-card__actions {
      flex-grow: 1;
      max-width: 200px;
      margin: 0 12px;
    }
  }
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
