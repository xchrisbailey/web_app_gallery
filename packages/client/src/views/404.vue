<template>
  <v-container class="center">
    <v-card>
      <v-card-title class="text-h4 text-sm-h3">Page not found</v-card-title>
      <v-card-subtitle class="pt-2"> "{{ $route.path }}" is not recognized as a valid page </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NotFound",

  data: () => ({})
});
</script>
