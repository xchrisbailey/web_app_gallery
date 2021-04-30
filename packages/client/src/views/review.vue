<template>
  <div id="rating">
    <div>
      <v-alert type="error" :value="error" v-if="error">
        <v-layout row wrap justify-space-around>
          <v-flex sx12 md9>
            {{ errorMsg }}
          </v-flex>
          <v-flex xs12 md3>
            <v-btn @click="goBack" color="warning">Click Here to go Back</v-btn>
          </v-flex>
        </v-layout>
      </v-alert>
    </div>
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
            label="review"
            auto-grow
            clearable
            counter="250"
            :rules="[rules.length(250)]"
          >
          </v-textarea>
        </v-flex>
      </v-layout>
      <v-layout justify-center>
        <v-flex xs5 md12>
          <v-btn block :loading="loading" color="primary" type="submit" @click="submit">
            Submit
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { submitReview } from "../services/reviewApi";
export default {
  name: "rating",

  data: () => ({
    userReview: undefined,
    rate: undefined,
    loading: false,
    error: false,
    errorMsg: "",

    rules: {
      length: (len: number) => (v: any) => (v || "").length <= len || `Invalid character length, max ${len}`
    }
  }),
  methods: {
    submit() {
      if (this.userReview?.length > 250) {
        this.error = true;
        this.errorMsg = "Invalid size of review";
      } else {
        this.loading = true;
        this.error = false;
        submitReview(this.userReview, this.rate, this.$route.params.id)
          .then(review => {
            console.log(review);
            this.loading = false;
            this.goBack();
          })
          .catch(error => {
            this.error = true;
            this.errorMsg = error;
            console.log(error);
          });
      }
    },
    goBack() {
      this.$router.push({ path: "." });
    }
  }
};
</script>
