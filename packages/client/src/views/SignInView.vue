<template>
  <SignIn msg="Sign In to the WebApp Gallery" />
</template>

<script>
import SignIn from "../components/SignIn.vue"; // @ is an alias to /src
export default {
  name: "signIn",
  components: {
    SignIn
  }
};
</script>