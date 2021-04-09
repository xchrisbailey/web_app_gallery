<template>
  <router-link class="wrapper ma-3" :to="'/apps/' + app._id">
    <v-avatar class="icon" rounded="lg" size="80" color="grey" :class="{ maskable: icon.purpose == 'maskable' }">
      <img :src="icon.src" alt="" v-if="app" />
    </v-avatar>
    <h4 class="text-h5 name">{{ app.name }}</h4>
    <v-rating length="5" :value="(appData && appData.averageRating) || 0" readonly half-increments dense />
  </router-link>
</template>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  margin: 12px;
  gap: 0 12px;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "icon name"
    "icon other";
  text-decoration: inherit;
  color: inherit;

  .icon {
    grid-area: icon;
  }

  .name {
    grid-area: name;
  }
}

.maskable img {
  width: 110%;
  height: 110%;
}
</style>

<script lang="ts">
import { findIcon } from "@/services/webAppUtils";
import { Icon, WebApp } from "@/types";
import Vue, { PropType } from "vue";
export default Vue.extend({
  name: "ListApp",
  props: {
    app: Object as PropType<WebApp>
  },
  computed: {
    icon() {
      const icon = findIcon(this.app.icons as Icon[]);
      return {
        src: new URL(icon.src, this.app.manifestURL).href,
        purpose: icon.purpose
      };
    }
  }
});
</script>
