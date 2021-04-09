<template>
  <v-alert type="error" v-if="error">
    {{ error }}
  </v-alert>
  <v-card v-else flat :loading="loading">
    <div class="d-flex flex-no-wrap">
      <v-avatar
        class="ma-3"
        rounded="xl"
        size="120"
        color="grey"
        :class="{ maskable: appData && icon.purpose == 'maskable' }"
      >
        <img :src="icon.src" alt="" v-if="appData" />
      </v-avatar>
      <div class="name-and-photo">
        <v-card-title class="text-h4" v-text="(appData && appData.name) || ''"></v-card-title>

        <v-card-actions class="pl-4 pr-4">
          <v-btn block color="primary" :href="appData && appData.startURL" target="_blank" rel="noopener noreferrer">
            Open App
          </v-btn>
        </v-card-actions>
      </div>
    </div>
    <v-card-text>
      <p>{{ (appData && appData.description) || "" }}</p>
      <v-rating length="5" :value="(appData && appData.averageRating) || 0" readonly half-increments dense />
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.v-alert {
  position: fixed;
  bottom: 0;
  width: stretch;
  margin: 12px;
}

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
import { getApp } from "@/services/api";
import { findIcon } from "@/services/webAppUtils";
import { Icon, WebApp } from "@/types";
import Vue from "vue";

export default Vue.extend({
  name: "WebApp",

  data: () => ({
    appData: null as WebApp | null,
    icon: null as Icon | null,
    loading: true,
    error: undefined as string | undefined
  }),

  created: function() {
    getApp(this.$route.params.id)
      .then(app => {
        this.loading = false;
        this.appData = app;

        this.icon = findIcon(app.icons);
      })
      .catch(error => {
        this.error = error;
      });
  }
});
</script>
