<script>
import { RunAlertMixin } from '../../../mixins/RunAlertMixin';

import { useUtilsStore } from '../../../stores/utils';
import { useProfileStore } from '../../../stores/profile';

import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import firebase from 'firebase/compat/app';
import axios from "axios";

export default {
    mixins: [RunAlertMixin],
    components: {
        FloatLabel,
        InputText,
        Password
    },
    setup() {
        const utilsStore = useUtilsStore();
        const profileStore = useProfileStore();

        return {
            utilsStore,
            profileStore
        };
    },
    data() {
        return {
            v$: useVuelidate(),

            email: null,
            password: null,

            emailError: false,
            passwordError: false,
            errorMessage: "",

            idToken: null,
        }
    },
    validations() {
        return {
            email: { required, email },
            password: { required },
        }
    },
    methods: {
        async logout() {
            try {
                await firebase.auth().signOut().then(() => {
                    localStorage.setItem('user', null)
                    this.runAlert('success', 'Bem-sucedido Logout', '', 3000);
                    this.$router.push('/');
                })
            } catch (error) {
                this.runAlert('error', 'Logout Error', '', 3000);
                console.error(error.code);
            }
        },
        async sendRequest() {
            let domain = this.utilsStore.domain;

            if (firebase.auth().currentUser) {
                await firebase.auth().currentUser.getIdToken(true).then(async (idToken) => {
                    const headers = {
                        'auth': idToken
                    }
                    const res = await axios.get(`${domain}/auth/user-auth`, { headers });
                    localStorage.setItem('user', JSON.stringify(res.data.user.uid));
                }).catch((error) => {
                    console.log(error.message)
                });
            } else {
                console.log('Current user do not exist');
            }
        },
        async login() {
            await firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(async () => {
                await this.sendRequest().then( async () => {
                    this.runAlert("success", "Bem-sucedido Login", "", 2000);

                    const user = await this.profileStore.getUser();

                    if(user.role === 'owner' || user.role === 'admin'){
                        this.$router.push("/admin/cars");
                    } else {
                        await this.logout() 
                        this.$router.push("/");
                    }
                })
            }).catch((error) => {
                if (
                    error.code === "auth/user-not-found" ||
                    error.code === "auth/wrong-password" ||
                    error.code === "auth/invalid-credential"
                ) {
                    this.errorMessage = "E-mail ou senha password. Por favor, tente novamente.";
                } else if (error.code === "auth/user-disabled") {
                    this.errorMessage =
                        "Sua conta foi desativada. Entre em contato com o suporte ao cliente para obter assistência.";
                } else {
                    this.errorMessage =
                        "Ocorreu um erro ao processar seu login. Por favor, tente novamente mais tarde.";
                }
                this.runAlert("error", "Login Erro", this.errorMessage, 3000);
            })
        },
        async submitForm() {
            this.v$.$validate();

            if (!this.v$.$error) {
                await this.login();
            } else {
                if (this.v$.email.$error) {
                    this.emailError = true;
                    this.runAlert("error", `E-mail Erro`, this.v$.email.$errors[0].$message, 3000)
                }
                if (this.v$.password.$error) {
                    this.passwordError = true;
                    this.runAlert("error", "Password Erro", this.v$.password.$errors[0].$message, 3000);
                }
            }
        }
    }
}
</script>

<template>
    <section class="flex flex-col items-center justify-center py-20 px-4 mx-auto w-full max-w-[1220px] relative overflow-hidden">
        <img src="../../../assets/images/logo.png" alt="logo" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px]">
        <div class="bg-brand-black/80 border-2 border-brand-gray p-6 rounded-md w-full max-w-[420px] relative z-[2] backdrop-blur-sm drop-shadow-md">
            <div class="w-fit">
                <h2 class="font-Barlow font-bold text-white text-3xl md:text-4xl uppercase">Login</h2>
                <div class="w-1/2 h-1 bg-brand-orange"></div>
            </div>

            <form @submit.prevent="submitForm()" class="flex flex-col gap-8 mt-12 mb-8">
                <FloatLabel>
                    <InputText id="email" v-model="email" @input="emailError = false" :class="{'error-input': emailError}"/>
                    <label for="email">E-mail</label>
                </FloatLabel>
                <FloatLabel>
                    <Password toggleMask :feedback="false" id="password" v-model="password" @input="passwordError = false" class="w-full" :class="{'error-input':passwordError}"/>
                    <label for="password">Password</label>
                </FloatLabel>

                <button type="submit" class="base-button !w-[180px] mx-auto">Enviar</button>
            </form>

            <p class="font-Barlow font-base text-lg text-white text-center leading-5">Esqueceu seu password?<br><router-link to="/auth/reset-password" class="font-medium text-brand-orange duration-300 ease-linear hover:text-white">Redefinir password</router-link></p>
        </div>
    </section>
</template>