<template>
  <v-container class="action">
    <v-card elevation="1" width="600">
      <v-card-title justify-center>
        {{ msg }}
      </v-card-title>
      <v-spacer> </v-spacer>
      <v-card-subtitle>
        {{ "Enter your E-mail:" }}
      </v-card-subtitle>
      <v-col cols="12" sm="8">
        <v-text-field v-model="email" label="E-mail" autocomplete="email" :rules="[rules.email, rules.required]">
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
      <v-card-text>
        No account, no problem just
        <router-link to="/signUp">Sign Up</router-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { getUsers, logInUser } from "../services/signUpApi";
export default {
  name: "SignIn",
  props: {
    msg: String
  },

  data: () => ({
    email: undefined,
    password: undefined,
    loading: false,
    error: false,
    errorMsg: "",

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
        })
        .catch(err => {
          console.log(err);
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
