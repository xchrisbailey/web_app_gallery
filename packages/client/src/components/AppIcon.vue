<template>
  <picture :class="{ maskable: icon.purpose == 'maskable' }">
    <img :src="icon.src" alt="" />
  </picture>
</template>

<style lang="scss" scoped>
picture {
  overflow: hidden;
  border-radius: 20%;
  aspect-ratio: 1;

  @supports not (aspect-ratio: 1) {
    padding-bottom: 100%;
    position: relative;

    img {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
}
img {
  width: 100%;
  .maskable > & {
    transform: scale(1.1);
  }
}
</style>

<script lang="ts">
import { findIcon } from "@/services/webAppUtils";
import { Icon } from "@/types";
import Vue, { PropType } from "vue";

export default Vue.extend({
  name: "AppIcon",
  props: {
    icons: {
      type: Array as PropType<Icon[]>,
      required: true
    }
  },
  computed: {
    icon(): Icon {
      return findIcon(this.icons);
    }
  }
});
</script>
