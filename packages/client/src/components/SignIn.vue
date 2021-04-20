<template>
  <div class="action">
    <v-container>
      <v-row>
        <v-dialog v-model="success" width="500">
          <v-card>
            <v-card-text>
              You are logged In
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <router-link to="/profile" @click="dialog = false">Profile</router-link>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-card elevation="24" outlined width="600">
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
              filled
              autocomplete="email"
              :rules="[rules.email, rules.required]"
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
              filled
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
      </v-row>
    </v-container>
  </div>
</template>

<script>
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
    error: false,
    errorMsg: "",
    success: false,

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
          this.success = true;
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
  height: 90vh;
}
</style>
