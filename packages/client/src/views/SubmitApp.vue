<template>
  <v-form v-model="valid">
    <v-container>
      <v-text-field type="url" v-model="url" :rules="urlRules" label="Webapp URL" outlined required></v-text-field>
      <v-select
        :items="categories"
        v-model="category"
        :rules="categoryRules"
        label="Category"
        outlined
        required
      ></v-select>
      <v-btn :loading="loading" :disabled="!valid" color="primary" v-on:click="submit()">Submit App</v-btn>
      <v-alert class="mt-4 mb-0 sticky" type="error" v-if="error"> {{ error }} </v-alert>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { required, validUrl } from "@/services/validators";
import { submitApp } from "@/services/webAppApi";
import { categories, Category } from "@/types";
import Vue from "vue";

export default Vue.extend({
  name: "SubmitApp",
  metaInfo: {
    title: "New App"
  },
  data: () => ({
    valid: false,
    loading: false,
    error: "",
    url: "",
    urlRules: [required("WebApp URL"), validUrl("Webapp URL")],
    categories,
    category: undefined as Category | undefined,
    categoryRules: [required("Category")]
  }),
  methods: {
    submit: function() {
      this.loading = true;
      this.error = "";
      submitApp(this.url, this.category as Category)
        .then(app => {
          this.$router.push(app._id);
        })
        .catch(err => {
          this.error = err.toString();
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
});
</script>
