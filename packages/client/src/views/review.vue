<template>
  <div id="rating">
    <v-container>
      <v-layout row wrap justify-center>
        <v-flex xs4 md1>
          <h1 class="headline font-weight-bold mb-3">Review</h1>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex s4 md5>
          <p class="text-left">Give the WebApp a rating</p>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-space-around>
        <v-flex xs12 md12>
          <v-rating
            v-model="rate"
            hover
            color="primary"
            :background-color="this.$vuetify.theme.dark ? 'primary darken-2' : 'primary lighten-2'"
            :rules="[rules.required('Rating')]"
          ></v-rating>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex s4 md12>
          <v-divider></v-divider>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex s4 md5>
          <p class="text-left">Write down your review below (optional)</p>
        </v-flex>
      </v-layout>
      <v-layout row wrap justtify-center>
        <v-flex xs15 md12 justify-center>
          <v-textarea
            v-model="userReview"
            outlined
            label="Review"
            auto-grow
            clearable
            counter="250"
            :rules="[rules.maxLength('Review', 250)]"
          >
          </v-textarea>
        </v-flex>
      </v-layout>
      <v-layout justify-center>
        <v-flex xs5 md12>
          <v-btn :loading="loading" color="primary" type="submit" @click="submit" :disabled="rate === 0">
            Submit
          </v-btn>
          <v-btn class="ml-4" color="primary" text @click="goBack">
            Cancel
          </v-btn>
        </v-flex>
      </v-layout>
      <v-alert class="mt-4 mb-0" type="error" :value="error" v-if="error">
        {{ error }}
      </v-alert>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { required, maxLength } from "@/services/validators";
import { submitReview } from "../services/reviewApi";
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

    rules: {
      maxLength,
      required
    }
  }),
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
