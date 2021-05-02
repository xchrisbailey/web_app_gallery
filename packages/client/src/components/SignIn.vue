<template>
  <v-container class="center">
    <v-card elevation="1" width="600">
      <v-card-title justify-center>
        {{ msg }}
      </v-card-title>
      <v-spacer> </v-spacer>
      <v-card-subtitle>
        {{ "Enter your E-mail:" }}
      </v-card-subtitle>
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="email"
          label="E-mail"
          autocomplete="email"
          :rules="[rules.email, rules.required]"
          outlined
          required
        >
        </v-text-field>
      </v-col>
      <v-card-subtitle>
        {{ "Enter your password:" }}
      </v-card-subtitle>
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="password"
          label="password"
          type="password"
          autocomplete="current-password"
          :rules="[rules.required]"
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
import { logInUser } from "../services/signUpApi";

export default {
  name: "SignIn",
  props: {
    msg: String
  },

  data: () => ({
    email: undefined,
    password: undefined,
    loading: false,
    error: undefined as string | undefined,

    rules: {
      email: v => !!(v || "").match(/@/) || "Please enter a valid email",
      required: v => !!v || "This field is required"
    }
  }),
  methods: {
    submit() {
      this.loading = true;
      logInUser(this.email, this.password)
        .then(users => {
          console.log(users);
          this.$store.dispatch("singInUser");
          this.$router.replace(this.$route.query.redirect || "/profile");
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
};
</script>
