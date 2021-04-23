<template>
  <router-link class="wrapper" :to="'/apps/' + app._id">
    <AppIcon class="icon" :icons="app.icons"></AppIcon>
    <h4 class="text-h5 name">{{ app.name }}</h4>
    <v-rating length="5" :value="app.averageRating" readonly half-increments dense />
  </router-link>
</template>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  gap: 0 12px;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "icon name"
    "icon other";
  text-decoration: inherit;
  color: inherit;

  .icon {
    grid-area: icon;
    width: 80px;
  }

  .name {
    grid-area: name;
    overflow: hidden;
    overflow: clip;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (hover: hover) {
    &:hover .name {
      text-decoration: underline;
    }
  }
}
</style>

<script lang="ts">
import { WebApp } from "@/types";
import Vue, { PropType } from "vue";
import AppIcon from "@/components/AppIcon.vue";

export default Vue.extend({
  name: "ListApp",
  components: {
    AppIcon
  },
  props: {
    app: Object as PropType<WebApp>
  }
});
</script>
