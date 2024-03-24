<script>
import { RunAlertMixin } from '../../../mixins/RunAlertMixin';

import { useUtilsStore } from '../../../stores/utils';

import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';

import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import axios from "axios";
export default {
    mixins: [RunAlertMixin],
    components: {
        FloatLabel,
        InputText,
    },
    setup() {
        const utilsStore = useUtilsStore();

        return {
            utilsStore
        };
    },
    data() {
        return {
            v$: useVuelidate(),
            errorMessage: "",

            email: null,
            emailError: false,
        }
    },
    validations() {
        return {
            email: { required, email },
        };
    },
    methods: {
        async submitForm() {
            this.v$.$validate();
            let domain = this.utilsStore.domain;
            if (!this.v$.$error) {
                await axios
                    .post(`${domain}/auth/reset-password`, {
                        email: this.email,
                    })
                    .then(() => {
                        this.runAlert(
                            "success",
                            "Redefinição de password enviada",
                            "Um e-mail com instruções para redefinir seu password foi enviado para seu endereço de e-mail.",
                            4000
                        );

                        this.$router.push("/auth/login");
                    })
                    .catch((error) => {
                        if (error.response.data.code === "auth/user-not-found" || error.response.data.code === 'auth/invalid-credential') {
                            this.errorMessage =
                                "Lamentamos, mas não conseguimos encontrar uma conta com esse endereço de e-mail.";
                        } else {
                            this.errorMessage =
                                "Desculpe, não foi possível processar sua solicitação de redefinição de password neste momento. Por favor, tente novamente mais tarde.";
                        }
                        this.runAlert("error", "Erro", this.errorMessage, 3000);
                    });
            } else {
                if (this.v$.email.$error) {
                    this.emailError = true;
                    this.runAlert("error", "E-mail Erro", this.v$.email.$errors[0].$message, 3000);
                }
            }
        }
    }
}
</script>

<template>
    <section
        class="flex flex-col items-center justify-center py-20 px-4 mx-auto w-full max-w-[1220px] relative overflow-hidden">
        <img src="../../../assets/images/logo.png" alt="logo"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px]">
        <div
            class="bg-brand-black/80 border-2 border-brand-gray p-6 rounded-md w-full max-w-[420px] relative z-[2] backdrop-blur-sm drop-shadow-md">
            <div class="w-fit">
                <h2 class="font-Barlow font-bold text-white text-3xl md:text-4xl uppercase">Redefinir Password</h2>
                <div class="w-1/2 h-1 bg-brand-orange"></div>
            </div>

            <form @submit.prevent="submitForm()" class="flex flex-col gap-8 mt-12 mb-8">
                <FloatLabel>
                    <InputText id="email" v-model="email" @input="emailError = false"
                        :class="{ 'error-input': emailError }" />
                    <label for="email">E-mail</label>
                </FloatLabel>

                <button type="submit" class="base-button !w-[180px] mx-auto">Enviar</button>
            </form>

            <p class="font-Barlow font-base text-lg text-white text-center leading-5">Voltar para <router-link
                    to="/auth/login"
                    class="font-medium text-brand-orange duration-300 ease-linear hover:text-white">Login</router-link>
            </p>
        </div>
    </section>
</template>