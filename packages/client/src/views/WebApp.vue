<template>
  <v-alert type="error" v-if="error">
    {{ error }}
  </v-alert>
  <v-card v-else flat :loading="loading">
    <div class="d-flex flex-no-wrap">
      <AppIcon class="ma-3 icon" :icons="appData.icons"></AppIcon>
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

.icon {
  width: 120px;
}

.v-card__title {
  word-break: unset;
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
import { getApp } from "@/services/webAppApi";
import { findIcon } from "@/services/webAppUtils";
import { Icon, WebApp } from "@/types";
import Vue from "vue";
import AppIcon from "@/components/AppIcon.vue";

export default Vue.extend({
  name: "WebApp",
  components: {
    AppIcon
  },

  data: () => ({
    appData: null as WebApp | null,
    loading: true,
    error: undefined as string | undefined
  }),

  created: function() {
    getApp(this.$route.params.id)
      .then(app => {
        this.loading = false;
        this.appData = app;
      })
      .catch(error => {
        this.error = error;
      });
  }
});
</script>
