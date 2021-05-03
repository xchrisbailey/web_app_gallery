<template>
  <v-container>
    <v-layout row wrap justify-center>
      <h1 class="headline font-weight-bold ma-3">Review {{ app.name }}</h1>
    </v-layout>
    <p class="mt-4 mb-1">Choose a star rating:</p>
    <v-rating
      v-model="rate"
      hover
      size="32"
      color="primary"
      :background-color="this.$vuetify.theme.dark ? 'primary darken-2' : 'primary lighten-2'"
    ></v-rating>
    <p class="mt-4">Write a review:</p>
    <v-textarea
      class="mt-4"
      v-model="userReview"
      outlined
      label="Review"
      auto-grow
      clearable
      counter="250"
      :rules="[rules.required('Review'), rules.maxLength('Review', 250)]"
    >
    </v-textarea>
    <v-btn :loading="loading" color="primary" type="submit" @click="submit" :disabled="rate === 0 || userReview === ''">
      Submit
    </v-btn>
    <v-btn class="ml-4" color="primary" text @click="goBack">
      Cancel
    </v-btn>
    <v-alert class="mt-4 mb-0" type="error" :value="error" v-if="error">
      {{ error }}
    </v-alert>
  </v-container>
</template>

<style lang="scss" scoped>
.v-rating {
  display: inline-block;
}
</style>

<script lang="ts">
import Vue from "vue";
import { required, maxLength } from "@/services/validators";
import { submitReview } from "../services/reviewApi";
import { WebApp } from "@/types";
import { getApp } from "@/services/webAppApi";
export default Vue.extend({
  name: "rating",

  metaInfo: {
    title: "Review"
  },

  data: () => ({
    userReview: "",
    rate: 0,
    loading: false,
    error: undefined as string | undefined,
    app: undefined as WebApp | undefined,

    rules: {
      maxLength,
      required
    }
  }),

  created: function() {
    this.app = (this.$route.params.app as unknown) as WebApp;
    if (this.app?.name == undefined) {
      getApp(this.$route.params.id).then(app => {
        this.app = app;
      });
    }
  },

  methods: {
    submit() {
      console.log(this.rate);

      if (this.userReview?.length > 250) {
        this.error = "Invalid size of review";
      } else if (this.rate == 0) {
        this.error = "Please rate at the app";
      } else {
        this.loading = true;
        submitReview(this.userReview, this.rate, this.$route.params.id)
          .then(review => {
            console.log(review);
            this.goBack();
          })
          .catch(error => {
            this.error = error;
            console.log(error);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    goBack() {
      this.$router.push({ path: "." });
    }
  }
});
</script>
