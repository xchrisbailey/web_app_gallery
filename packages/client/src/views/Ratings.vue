<template>
<div class="Ratings">
    <v-container>
        <v-layout row wrap justify-center>
            <v-flex xs4 md1>
                <h1 class="headline font-weight-bold mb-3">Rating</h1>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex s4 md5>
                <p class="text-left">What rate do you give the Webapp at a scale 1 to 5</p>
            </v-flex>
        </v-layout>
        <v-layout row wrap justify-space-around>
            <v-flex xs12 md12>
                <v-radio-group
                v-model="row"
                row
                >
                    <v-flex xs2 md1>
                        <v-radio
                        label="1"
                        value="rating-1"
                        ></v-radio>
                        </v-flex>
                    <v-flex xs2 md1>
                        <v-radio
                        label="2"
                        value="rating-2"
                        ></v-radio>
                        </v-flex>
                    <v-flex xs2 md1>
                        <v-radio
                        label="3"
                        value="rating-3"
                        ></v-radio>
                        </v-flex>
                    <v-flex xs2 md1>
                        <v-radio
                        label="4"
                        value="rating-4"
                        ></v-radio>
                        </v-flex>
                    <v-flex xs2 md1>
                        <v-radio
                        label="5"
                        value="rating-5"
                        ></v-radio>
                        </v-flex>
                </v-radio-group>
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


<style lang="scss" scoped>

</style>