<template>
  <div class="signIn">
    <SignIn msg="Sign In to the WebApp Gallery" />
  </div>
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
