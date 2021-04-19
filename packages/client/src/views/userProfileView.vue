<template>
    <div id="profile">
        <v-container>
            <v-layout row>
                <v-flex xs12 md6>
                    <v-card
                    elevation = "0">
                        <v-card-title>
                            Profile Information 
                        </v-card-title>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
         <v-container>
             <v-row justify = "center">
                 <v-avatar 
                 color = "accent"
                 size = "128">
                 </v-avatar>
             </v-row>
         </v-container>
         <v-container>
             <v-layout>
                 <v-flex xs12 md6>
                     <v-card
                     elevation = "0">
                     <v-card-title>
                         First Name:
                     </v-card-title>
                     <v-card-text>
                         {{ userData && userData.firstName}}
                     </v-card-text>
                     </v-card>
                 </v-flex>
             </v-layout>
             <v-layout>
                 <v-flex xs12 md6>
                     <v-card
                     elevation = "0">
                     <v-card-title>
                         Last Name:
                     </v-card-title>
                     <v-card-text>
                         {{ userData && userData.lastName}}
                     </v-card-text>
                     </v-card>
                 </v-flex>
             </v-layout>
             <v-layout>
                 <v-flex xs12 md6>
                     <v-card
                     elevation = "0">
                     <v-card-title>
                         E-mail:
                     </v-card-title>
                     <v-card-text>
                         {{ userData && userData.email}}
                     </v-card-text>
                     </v-card>
                 </v-flex>
             </v-layout>
         </v-container>
    </div>
</template>

<script lang="ts">
import { getUser } from "../services/signUpApi";
import { User } from "../types";
import Vue from "vue";

export default Vue.extend({
  name: "User",

  data: () => ({
    userData: null as  User | null,
  }),

  created: function() {
    getUser()
      .then(user => {
        this.userData = user;
      })
      .catch(error => {
        console.log(error);
      });
  }
});
</script>