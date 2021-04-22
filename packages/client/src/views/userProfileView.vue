<template>
  <div id="profile">
    <v-container>
      <v-layout row>
        <v-flex xs12 md6>
          <v-card elevation="0">
            <v-card-title>
              Profile Information
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-row justify="center">
        <v-avatar color="accent" size="128" class="grey lighten-2">
          <span class="white--text headline" > 
            <p>{{userInitials}}</p>
          </span>
          </v-avatar>
      </v-row>
    </v-container>
    <v-container>
      <v-layout>
        <v-flex xs12 md6>
          <v-card elevation="0">
            <v-card-title>
              First Name:
            </v-card-title>
            <v-card-text>
              {{ userData && userData.firstName }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 md6>
          <v-card elevation="0">
            <v-card-title>
              Last Name:
            </v-card-title>
            <v-card-text>
              {{ userData && userData.lastName }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 md6>
          <v-card elevation="0">
            <v-card-title>
              E-mail:
            </v-card-title>
            <v-card-text>
              {{ userData && userData.email }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 md6>
          <v-card elevation="0">
            <v-btn @click="signOut"
            color="error">
              Sign out
            </v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { getUser, logOutUser } from "../services/signUpApi";
import { User } from "../types";
import Vue from "vue";
import initials from "initials";

export default Vue.extend({
  name: "User",

  data: () => ({
    userData: null as User | null,
    userInitials: undefined

  }),

  created: function() {
    getUser()
      .then(user => {
        this.userData = user;
        this.userInitials = initials(this.userData.firstName+ " " + this.userData.lastName)
      })
      .catch(error => {
        console.log(error);
      });

  },
  methods: {
    signOut(){
      logOutUser()
      .then(user => {
        console.log(user);
        this.$router.push({ path: '/signIn'})
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
});
</script>

<style lang="scss" scoped>
p{
  text-transform: uppercase;
  font-size: 1.125cm;
  position:absolute;
  top:45px;
  left:39px;
}
</style>