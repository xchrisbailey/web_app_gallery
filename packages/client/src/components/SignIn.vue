<template>
  <v-container class="center">
    <v-card elevation="1" width="600">
      <v-card-title justify-center>
        Sign In to the Web App Gallery
      </v-card-title>
      <v-spacer> </v-spacer>
      <v-card-subtitle>
        Enter your Email:
      </v-card-subtitle>
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="email"
          label="Email"
          autocomplete="email"
          :rules="[rules.validEmail('Email'), rules.required('Email')]"
          outlined
          required
        >
        </v-text-field>
      </v-col>
      <v-card-subtitle>
        Enter your Password:
      </v-card-subtitle>
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          autocomplete="current-password"
          :rules="[rules.required('Password')]"
          outlined
          required
        >
        </v-text-field>
      </v-col>
      <v-container>
        <v-layout align-center>
          <v-flex xs2 md12>
            <v-btn color="primary" type="submit" @click="submit" :loading="loading">
              Sign In
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <v-alert class="ma-4" type="error" :value="error" v-if="error">
        {{ error }}
      </v-alert>
      <v-card-text>
        No account, no problem just
        <router-link :to="{ name: 'signUp', query: { redirect: $route.query.redirect } }">Sign Up</router-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { required, validEmail } from "@/services/validators";
import { logInUser } from "../services/signUpApi";

export default Vue.extend({
  name: "SignIn",

  data: () => ({
    email: "",
    password: "",
    showPassword: false,
    loading: false,
    error: undefined as string | undefined,

    rules: {
      validEmail,
      required
    }
  }),
  methods: {
    submit() {
      this.loading = true;
      logInUser(this.email, this.password)
        .then(users => {
          console.log(users);
          this.$store.dispatch("singInUser");
          this.$router.replace(
            typeof this.$route.query.redirect === "string" ? this.$route.query.redirect : "/profile"
          );
        })
        .catch(err => {
          console.log(err);
          this.error = err;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
});
</script>
