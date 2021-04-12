<template>
  <div class="action">
    <v-container md>
      <v-row>
        <v-card elevation="24" outlined width="600">
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
              filled
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
              filled
            >
            </v-text-field>
          </v-col>
          <v-card-subtitle>
            {{ "Enter your E-mail:" }}
          </v-card-subtitle>
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="email"
              label="E-mail"
              :rules="[rules.email, rules.required]"
              filled
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
              filled
            >
            </v-text-field>
          </v-col>
          <v-container>
            <v-layout align-center>
              <v-flex xs2 md12>
                <v-btn color="primary" type="submit" :loading="loading" @click="submit">
                  Sign In
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-text>
            Already have an account, no problem just
            <router-link to="/signIn">Sing In</router-link>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script >
import { submitUser } from "../services/signUpApi";
import { getUsers } from "../services/signUpApi";

export default {
  name: "SignIn",
  props: {
    msg: String,
  },

  data: () => ({
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      password: undefined,
      loading: false,
      form: false,

    rules: {
      password: (v) =>
        !!(v || "").match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
        ) ||
        "Password must contain an upper case letter, a numeric character, and a special character",
      required: (v) => !!v || "This field is required",
      email: (v) => !!(v || "").match(/@/) || "Please enter a valid email",
    },
    }),
    methods:{
      submit() {
        this.loading = true
        submitUser(this.lastName,this.firstName,this.email,this.password)
        this.loading = false
        },
        
    }
};
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>