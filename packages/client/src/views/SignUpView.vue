<template>
  <div class="signIn">
      <SignUp msg="Sing Up to enjoy all the features of our WebApp Gallery"/>
  </div>
</template>

<script>
import SignUp from "../components/SignUp.vue"; // @ is an alias to /src

export default ({
  name: "signUp",
  components: {
    SignUp
  }
});
</script>