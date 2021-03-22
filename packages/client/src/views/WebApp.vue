<template>
  <div>
    <img :src="appData.icon.src" alt="" height="128" width="128" />
    <h2>
      <a :href="appData.startUrl" target="_blank" rel="noopener noreferrer">
        {{ appData.name }}
      </a>
    </h2>
    <p>{{ appData.description }}</p>
    <meter min="0" max="5" :value="appData.averageRating">
      {{ appData.averageRating }} stars
    </meter>
  </div>
</template>

<script lang="ts">
import { WebApp } from "@/types";
import Vue from "vue";
import { sampleApps } from "../sampleData";

export default Vue.extend({
  name: "WebApp",

  data: () => ({
    appData: null as WebApp | null
  }),

  created: function() {
    this.appData = sampleApps[parseInt(this.$route.params.id)];
  }
});
</script>
