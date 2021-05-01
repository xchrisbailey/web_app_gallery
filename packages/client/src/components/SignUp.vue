<template>
  <v-container class="action">
    <v-dialog v-model="fail" width="500">
      <v-card>
        <v-card-text>
          This account is already in use
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="fail = false">
            Try Again
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card elevation="1" width="600">
      <v-card-title justify-center>
        {{ msg }}
      </v-card-title>
      <v-spacer> </v-spacer>
      <v-card-subtitle>
        {{ "Enter your First Name:" }}
      </v-card-subtitle>
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="firstName"
          label="First Name"
          :rules="[rules.required]"
          autocomplete="given-name"
          outlined
          required
        >
        </v-text-field>
      </v-col>
      <v-card-subtitle>
        {{ "Enter your LastName:" }}
      </v-card-subtitle>
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="lastName"
          label="Last Name"
          :rules="[rules.required]"
          autocomplete="family-name"
          outlined
          required
        >
        </v-text-field>
      </v-col>
      <v-card-subtitle>
        {{ "Enter your E-mail:" }}
      </v-card-subtitle>
      <v-col cols="12" sm="8">
        <v-text-field
          id="username"
          v-model="email"
          label="E-mail"
          :rules="[rules.email, rules.required]"
          autocomplete="email"
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
          :rules="[rules.password, rules.required]"
          autocomplete="new-password"
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
      <v-card-text>
        Already have an account, no problem just
        <router-link :to="{ name: 'signIn', query: { redirect: $route.query.redirect } }">Sign In</router-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { submitUser } from "../services/signUpApi";

export default {
  name: "SignUp",
  props: {
    msg: String
  },

  data: () => ({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    loading: false,
    form: false,
    fail: false,

    rules: {
      password: v =>
        !!(v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/) ||
        "Password must contain an upper case letter and a numeric character",
      required: v => !!v || "This field is required",
      email: v => !!(v || "").match(/@/) || "Please enter a valid email"
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
          this.fail = true;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
}
</style>
