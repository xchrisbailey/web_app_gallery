<template>
  <v-container class="center">
    <v-card elevation="1" width="600">
      <v-card-title justify-center>
        Sing Up to to the Web App Gallery
      </v-card-title>
      <v-spacer> </v-spacer>
      <v-card-subtitle>
        Enter your First Name:
      </v-card-subtitle>
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="firstName"
          label="First Name"
          :rules="[rules.required('First Name')]"
          autocomplete="given-name"
          outlined
          required
        >
        </v-text-field>
      </v-col>
      <v-card-subtitle>
        Enter your Last Name:
      </v-card-subtitle>
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="lastName"
          label="Last Name"
          :rules="[rules.required('Last Name')]"
          autocomplete="family-name"
          outlined
          required
        >
        </v-text-field>
      </v-col>
      <v-card-subtitle>
        Enter your Email:
      </v-card-subtitle>
      <v-col cols="12" sm="8">
        <v-text-field
          id="username"
          v-model="email"
          label="Email"
          :rules="[rules.required('Email'), rules.validEmail('Email')]"
          autocomplete="email"
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
          :rules="[rules.required('Password'), rules.minLength('Password', 10)]"
          autocomplete="new-password"
          counter
          outlined
          required
        >
        </v-text-field>
      </v-col>
      <v-container>
        <v-layout align-center>
          <v-flex xs2 md12>
            <v-btn color="primary" type="submit" :loading="loading" @click="submit">
              Sign Up
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <v-alert class="ma-4" type="error" :value="error" v-if="error">
        {{ error }}
      </v-alert>
      <v-card-text>
        Already have an account, no problem just
        <router-link :to="{ name: 'signIn', query: { redirect: $route.query.redirect } }">Sign In</router-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { required, validEmail, minLength } from "@/services/validators";
import { submitUser } from "../services/signUpApi";

export default {
  name: "SignUp",

  data: () => ({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
    loading: false,
    form: false,
    error: undefined as string | undefined,

    rules: {
      minLength,
      required,
      validEmail
    }
  }),
  methods: {
    submit() {
      this.loading = true;
      submitUser(this.firstName, this.lastName, this.email, this.password)
        .then(user => {
          console.log(user);
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
