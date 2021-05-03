<template>
  <div id="profile">
    <v-container>
      <v-row>
        <v-col>
          <h2 class="text-h3">
            Profile
          </h2>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-avatar color="primary" size="128" class="ma-4">
          <span class="white--text">{{ userInitials }}</span>
        </v-avatar>
      </v-row>
      <v-dialog v-model="edit" width="500">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="newFirstName"
                    label="First Name"
                    :rules="[rules.required('First Name')]"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="newLastName"
                    label="Last Name"
                    :rules="[rules.required('Last Name')]"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="newEmail"
                    label="Email"
                    :rules="[rules.required('Email'), rules.validEmail('Email')]"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-alert class="mt-4 mb-0 sticky" type="error" v-if="updateError"> {{ updateError }} </v-alert>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="edit = false" color="primary">Cancel</v-btn>
            <v-btn text @click="updateProfile" color="primary" :loading="updatingUserProfile">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="showDeletePrompt" width="500">
        <v-card>
          <v-card-title>
            <span class="headline">Delete Account?</span>
          </v-card-title>
          <v-card-text>
            Are you sure you want to permanently delete your Account?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="showDeletePrompt = false" color="primary">Cancel</v-btn>
            <v-btn text @click="deleteUser" color="error" :loading="deletingUser">Delete Account</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-row>
        <v-col cols="12" sm="6">
          <v-card-title>
            First Name:
          </v-card-title>
          <v-card-text>
            {{ userData && userData.firstName }}
          </v-card-text>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card-title>
            Last Name:
          </v-card-title>
          <v-card-text>
            {{ userData && userData.lastName }}
          </v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card-title>
            E-mail:
          </v-card-title>
          <v-card-text>
            {{ userData && userData.email }}
          </v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <v-btn @click="signOut" color="error">
            Sign out
          </v-btn>
        </v-col>
        <v-col cols="12" sm="4">
          <v-btn @click="showDeletePrompt = true" color="error">
            Delete Account
          </v-btn>
        </v-col>
        <v-col cols="12" sm="4">
          <v-btn color="primary" @click="editprofile">
            <v-icon left dark>
              mdi-pencil
            </v-icon>
            Edit Profile
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { required, validEmail } from "@/services/validators";
import { destroyUser, getUser, logOutUser, updateUser } from "../services/signUpApi";
import { User } from "../types";
import Vue from "vue";
import initials from "initials";

export default Vue.extend({
  name: "User",

  metaInfo: {
    title: "Profile"
  },

  data: () => ({
    userData: null as User | null,
    userInitials: undefined as string | undefined,
    edit: false,
    newFirstName: "",
    newLastName: "",
    newEmail: "",
    updatingUserProfile: false,
    updateError: undefined as string | undefined,
    showDeletePrompt: false,
    deletingUser: false,
    rules: {
      validEmail,
      required
    }
  }),

  created: function() {
    getUser()
      .then(user => {
        this.userData = user;
        this.userInitials = initials(this.userData.firstName + " " + this.userData.lastName) as string;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    signOut() {
      logOutUser()
        .then(message => {
          console.log(message);
          this.$store.dispatch("signOutUser");
          this.$router.push({ path: "/signIn" });
        })
        .catch(error => {
          console.log(error);
        });
    },
    editprofile() {
      this.edit = true;
      if (this.userData) {
        this.newFirstName = this.userData.firstName;
        this.newLastName = this.userData.lastName;
        this.newEmail = this.userData.email;
      }
    },
    updateProfile() {
      this.updatingUserProfile = true;
      updateUser(this.newEmail, this.newFirstName, this.newLastName)
        .then(user => {
          this.edit = false;
          this.updateError = undefined;
          console.log(user);
        })
        .catch(error => {
          this.updateError = error;
          console.log(error);
        })
        .finally(() => {
          this.updatingUserProfile = false;
        });
    },
    deleteUser() {
      this.deletingUser = true;
      destroyUser()
        .then(message => {
          this.edit = false;
          this.updateError = undefined;
          console.log(message);
          this.$store.dispatch("signOutUser");
          this.$router.push({ path: "/signUp" });
        })
        .catch(error => {
          alert(error);
          console.log(error);
        })
        .finally(() => {
          this.showDeletePrompt = false;
          this.deletingUser = false;
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
</style>
