<template>
  <SignIn />
</template>

<script>
import SignIn from "../components/SignIn.vue"; // @ is an alias to /src
export default {
  name: "signIn",
  metaInfo: {
    title: "Sign In"
  },
  components: {
    SignIn
  }
};
</script>
