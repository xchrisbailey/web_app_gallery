<template>
  <div id="profile">
    <v-container>
      <v-layout row>
        <v-flex xs12 md6>
          <v-card-title>
            Profile
          </v-card-title>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-row justify="center">
        <v-avatar color="primary" size="128">
          <span class="white--text">{{ userInitials }}</span>
        </v-avatar>
      </v-row>
    </v-container>
    <v-container>
      <v-dialog v-model="edit" width="500">
        <v-card>
        <v-container>
          <v-layout>
            <v-flex xs12 md6>
              <v-card-title>
                First Name:
              </v-card-title>
              <v-card-text>
                <v-text-field
            v-model="newFirstName"
            outlined
          ></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 md6>
              <v-card-title>
                Last Name:
              </v-card-title>
              <v-card-text>
                <v-text-field
            v-model="newLastName"
            outlined
          ></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 md6>
              <v-card-title>
                E-mail:
              </v-card-title>
              <v-card-text>
                <v-text-field
            v-model="newEmail"
            outlined
          ></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 md6>
              <v-btn @click="updateProfile" color="primary"> submit </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
        </v-card>
      </v-dialog>
      <v-layout>
        <v-flex xs12 md6>
          <v-card-title>
            First Name:
          </v-card-title>
          <v-card-text>
            {{ userData && userData.firstName }}
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 md6>
          <v-card-title>
            Last Name:
          </v-card-title>
          <v-card-text>
            {{ userData && userData.lastName }}
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 md6>
          <v-card-title>
            E-mail:
          </v-card-title>
          <v-card-text>
            {{ userData && userData.email }}
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 md6>
          <v-btn @click="signOut" color="error">
            Sign out
          </v-btn>
        </v-flex>
        <v-flex xs12 md6>
          <v-btn color="primary" fab small dark @click="editprofile">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <p class="editProfile">Edit Profile</p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { getUser, logOutUser, updateUser} from "../services/signUpApi";
import { User } from "../types";
import Vue from "vue";
import initials from "initials";

export default Vue.extend({
  name: "User",

  data: () => ({
    userData: null as User | null,
    userInitials: undefined,
    edit: false,
    newFirstName: undefined,
    newLastName: undefined,
    newEmail: undefined
  }),

  created: function() {
    getUser()
      .then(user => {
        this.userData = user;
        this.userInitials = initials(this.userData.firstName + " " + this.userData.lastName);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    signOut() {
      logOutUser()
        .then(user => {
          console.log(user);
          this.$router.push({ path: "/signIn" });
        })
        .catch(error => {
          console.log(error);
        });
    },
    editprofile() {
      this.edit = true;
      this.newFirstName = this.userData.firstName
      this.newLastName = this.userData.lastName
      this.newEmail = this.userData.email
    },
    updateProfile() {
      updateUser(this.newEmail,this.newFirstName,this.newLastName)
      .then(user => {
          console.log(user);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
});
</script>

<style lang="scss" scoped>
.v-avatar span {
  text-transform: uppercase;
  font-size: 48px;
}
.editProfile {
  position: absolute;
  right: 10.25cm;
  bottom: 2.75cm;
}
</style>
