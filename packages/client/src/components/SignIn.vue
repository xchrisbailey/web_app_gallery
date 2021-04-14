<template>
  <div class="action">
    <v-container>
      <v-row>
        <v-card elevation="24" outlined width="600">
          <v-card-title justify-center>
            {{ msg }}
          </v-card-title>
          <v-spacer> </v-spacer>
          <v-card-subtitle>
            {{ "Enter your E-mail:" }}
          </v-card-subtitle>
          <v-col cols="12" sm="8">
            <v-text-field label="E-mail" filled autocomplete="email"> </v-text-field>
          </v-col>
          <v-card-subtitle>
            {{ "Enter your password:" }}
          </v-card-subtitle>
          <v-col cols="12" sm="8">
            <v-text-field label="password" type="password" filled autocomplete="current-password"> </v-text-field>
          </v-col>
          <v-container>
            <v-layout align-center>
              <v-flex xs2 md12>
                <v-btn color="primary" type="submit" @click="submit">
                  Sign In
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-text>
            No account, no problem just
            <router-link to="/signUp">Sing Up</router-link>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  props: {
    msg: String
  },

  data: () => ({
    error: false,
    errorMsg: "",

    rules: {
      //authentication
    }
  }),
  methods: {
    submit() {
      //authentication
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
