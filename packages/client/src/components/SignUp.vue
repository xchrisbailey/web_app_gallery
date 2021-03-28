<template>
<div class = "action">
    <v-container md>
        <v-row >
            <v-card 
            elevation="24"
            outlined
            width="600"
            >
                <v-card-title justify-center>
                    {{ msg }}
                </v-card-title>
                <v-spacer>
                </v-spacer>
                <v-card-subtitle>
                    {{"Enter your First Name:"}}
                </v-card-subtitle>
                <v-col
                cols="12"
                sm="8"
                >
                <v-text-field
                v-model="firstName"
                label="First Name"
                filled
                >
                </v-text-field>
                </v-col>
                <v-card-subtitle>
                    {{"Enter your LastName:"}}
                </v-card-subtitle>
                <v-col
                cols="12"
                sm="8"
                >
                <v-text-field
                v-model="lastName"
                label="Last Name"
                filled
                >
                </v-text-field>
                </v-col>
                <v-card-subtitle>
                    {{"Enter your E-mail:"}}
                </v-card-subtitle>
                <v-col
                cols="12"
                sm="8"
                >
                <v-text-field
                v-model="email"
                label="E-mail"
                filled
                >
                </v-text-field>
                </v-col>
                <v-card-subtitle>
                    {{"Enter your password:"}}
                </v-card-subtitle>
                <v-col
                cols="12"
                sm="8"
                >
                <v-text-field
                v-model="password"
                label="password"
                filled
                >
                </v-text-field>
                </v-col>
                <v-container>
                    <v-layout align-center >
                    <v-flex xs2 md12>
                        <v-btn
                        color="primary"
                        type="submit"
                        @click="submit"
                        >
                        Sign In
                        </v-btn>
                    </v-flex>
                </v-layout>
                </v-container>
                <v-card-text>
                    Already have an account, no problem just <router-link to="/signIn">Sing In</router-link>
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
        msg: String,
    },

    data: () => ({
        password: undefined,
        email:undefined,
        fistName:undefined,
        lastName:undefined,
        error: false,
        errorMsg: '',

        rules: {
            //authentication
        }
    }),
    methods:{
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

}
</style>