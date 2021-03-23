<template>
<div class="">
    <v-container>
        <v-layout row wrap justify-center>
            <v-flex xs4 md1>
                <h1 class="headline font-weight-bold mb-3">Rating</h1>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex s4 md5>
                <p class="text-left">Give the WebApp a rating</p>
            </v-flex>
        </v-layout>
        <v-layout row wrap justify-space-around>
            <v-flex xs12 md12>
                <v-rating
                    v-model="rating"
                    icon-label="cutom icon label text {0} of {1}"
                ></v-rating>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex s4 md12>
                <v-divider></v-divider>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex s4 md5>
                <p class="text-left">Write down your review below</p>
            </v-flex>
        </v-layout>
        <v-layout row wrap justtify-center>
            <v-flex xs15 md12 justify-center>
            <V-textarea
            outlined
            name="user-review"
            label="review"
            >
            </V-textarea>
            </v-flex>
        </v-layout>
        <v-layout justify-center>
            <v-flex xs5 md12>
                <v-btn 
                block
                color="error"
                >
                    Submit
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script lang="ts">
import Vue from "vue";


</script>