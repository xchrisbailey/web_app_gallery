<template>
  <router-link :to="'/apps/' + app._id">{{ app.name }}</router-link>
</template>

<script lang="ts">
import { WebApp } from "@/types";
import Vue, { PropType } from "vue";
export default Vue.extend({
  name: "ListApp",
  props: {
    app: Object as PropType<WebApp>
  }
});
</script>
