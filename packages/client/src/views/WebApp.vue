<template>
  <v-container>
    <v-alert class="error" type="error" v-if="error">
      {{ error }}
    </v-alert>
    <AppIcon class="icon" :icons="appData ? appData.icons : []"></AppIcon>
    <h4 class="name text-h4">{{ (appData && appData.name) || "" }}</h4>

    <v-btn class="button" color="primary" :href="appData && appData.startURL" target="_blank" rel="noopener noreferrer">
      Open App
    </v-btn>

    <p class="description">{{ (appData && appData.description) || "" }}</p>

    <v-alert
      class="iOS-warning"
      outlined
      type="warning"
      text
      v-if="appData && !appData.appleMobileWebAppCapable && iOS"
    >
      This app may not work on your device
    </v-alert>

    <div class="screenshots" v-if="appData && appData.screenshots.length > 0">
      <img
        class="elevation-2"
        v-for="screenshot in appData.screenshots"
        :key="screenshot.src"
        :src="screenshot.src"
        :alt="screenshot.label"
      />
    </div>

    <label for="rating">
      Average Rating:
      <v-rating
        id="rating"
        length="5"
        :value="(appData && appData.averageRating) || 0"
        readonly
        half-increments
        size="32"
        dense
        color="primary"
        :background-color="this.$vuetify.theme.dark ? 'primary darken-2' : 'primary lighten-2'"
      />
    </label>

    <v-btn class="rate" :to="this.$route.params.id + '/review'" color="primary" outlined>
      Rate and Review
    </v-btn>

    <div>
      <Review class="review" v-for="review in appData.reviews" :key="review._id" :review="review"></Review>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";

.error {
  position: fixed;
  bottom: 0;
  width: stretch;
  margin: 12px;
}

.container {
  display: grid;
  gap: 12px;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "icon name"
    "icon button";

  > * {
    margin: 0;
    grid-column: 1 / -1;
  }
}

.name {
  grid-area: name;
  align-self: center;
  word-break: unset;
}

.icon {
  grid-area: icon;
  display: block;
  width: 120px;
}

.button {
  grid-area: button;
  max-width: 100px;
}

#rating {
  display: inline-block;
}

.rate {
  justify-self: start;
}

.review:not(:last-of-type) {
  margin-bottom: 12px;
}

.screenshots {
  overflow-x: auto;
  white-space: nowrap;
  scroll-snap-type: x;

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    margin-right: -12px;
    margin-left: -12px;
    padding-right: 12px;
    padding-left: 12px;
  }

  img {
    height: 450px;
    border-radius: 12px;
    scroll-snap-align: center;
    &:not(:last-of-type) {
      margin-right: 12px;
    }
  }
}

@media (min-width: 600px) {
  .container {
    grid-template-columns: auto auto 1fr;
    grid-template-areas: "icon name button";
  }

  .button {
    place-self: center stretch;
    @media (max-width: 800px) {
      place-self: center end;
    }
  }
}
</style>

<script lang="ts">
import { getApp } from "@/services/webAppApi";
import { WebApp } from "@/types";
import Vue from "vue";
import AppIcon from "@/components/AppIcon.vue";
import Review from "@/components/Review.vue";

export default Vue.extend({
  name: "WebApp",
  components: {
    AppIcon,
    Review
  },

  data: () => ({
    appData: null as WebApp | null,
    loading: true,
    error: undefined as string | undefined,
    iOS: false
  }),

  created: function() {
    this.iOS = navigator.platform.startsWith("iP");
    this.appData = (this.$route.params.app as unknown) as WebApp;
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
