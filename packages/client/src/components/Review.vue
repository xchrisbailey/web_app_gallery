<template>
  <v-card>
    <span class="text-h6">{{ review.user.firstName }} {{ review.user.lastName }} </span>
    <v-rating
      class="rating"
      length="5"
      :value="review.rating"
      readonly
      dense
      color="primary"
      :background-color="this.$vuetify.theme.dark ? 'primary darken-2' : 'primary lighten-2'"
    />
    <p>{{ review.review }}</p>
  </v-card>
</template>

<style lang="scss" scoped>
.v-card {
  padding: 12px;
}
p {
  margin: 0;
}
.rating {
  display: inline-block;
}
</style>

<script lang="ts">
import { Review } from "@/types";
import Vue, { PropType } from "vue";

export default Vue.extend({
  name: "Review",
  props: {
    review: {
      type: Object as PropType<Review>,
      required: true
    }
  }
});
</script>
