<script>
import { RunAlertMixin } from '../../../mixins/RunAlertMixin';
import { useUtilsStore } from '../../../stores/utils';

import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';

import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import axios from 'axios';

export default {
    mixins: [RunAlertMixin],
    components: {
        FloatLabel,
        InputText,
        InputNumber,
        Textarea
    },
    setup() {
        const utilsStore = useUtilsStore();

        return {
            utilsStore,
        };
    },
    data() {
        return {
            v$: useVuelidate(),

            name: null,
            email: null,
            message: null,

            nameError: false,
            emailError: false,
            messageError: false,

            errorMessage: "",
        }
    },
    validations() {
        return {
            name: { required },
            email: { required, email },
            message: { required },
        }
    },
    methods: {
        async submitForm() {
            this.v$.$validate();

            if (!this.v$.$error) {
                try {
                    let domain = this.utilsStore.domain;
                    const id = `${new Date().getTime()}${Math.random().toString(36).substring(2, 24)}`;
                    const currentDate = new Date();
                    await axios.post(`${domain}/api/messages/create`, {
                        data: {
                            id,
                            createdAt: currentDate,
                            name: this.name,
                            email: this.email,
                            message: this.message,
                            status: 'new'
                        },
                    }).then(async () => {
                        this.runAlert('success', 'Sucesso', 'Mensagem enviada com sucesso!', 3000);
                        this.name = null;
                        this.email = null,
                        this.message = null;

                    });
                } catch (error) {
                    console.error(error);
                    this.runAlert('error', 'Erro', 'Tente mais tarde', 3000);
                }
            } else {
                console.log(this.v$.name.$error, this.v$.email.$error, this.v$.message.$error)
                if (this.v$.name.$error) {
                    this.nameError = true;
                    this.runAlert("error", "Erro de validação: Nome", this.v$.name.$errors[0].$message, 3000);
                }
                if (this.v$.email.$error) {
                    this.emailError = true;
                    this.runAlert("error", "Erro de validação: E-mail", this.v$.email.$errors[0].$message, 3000)
                }
                if (this.v$.message.$error) {
                    this.messageError = true;
                    this.runAlert("error", "Erro de validação: Mensagem", this.v$.message.$errors[0].$message, 3000);
                }
            }
        }
    }
}
</script>

<template>
    <section class="bg-brand-gray relative ">
        <div class="absolute top-0 right-0 h-auto md:h-full w-full md:w-auto">
            <img src="../../../assets/images/contact-us-bg-md.png" alt="contact us"
                class="h-auto w-full aspect-[320/220] sm:aspect-[320/160] object-cover object-top md:hidden">
            <img src="../../../assets/images/contact-us-bg.png" alt="contact us" class="h-full hidden md:block">
            <div
                class="absolute w-full h-full top-px md:top-0 left-0 lg:-left-px bg-gradient-to-t md:bg-gradient-to-r from-brand-gray  to-brand-gray/50 lg:to-transparent z-[2]">
            </div>
        </div>
        <div class="max-w-[380px] md:max-w-[960px] w-full mx-auto px-4 relative z-[3] pt-40 pb-20 md:py-20">
            <div class="w-fit ">
                <h2 class="font-Barlow font-bold text-white text-3xl md:text-4xl uppercase">CONTATE-NOS</h2>
                <div class="w-1/3 h-1 bg-brand-orange"></div>
            </div>
            <form @submit.prevent="submitForm()" class="my-12 max-w-[380px] md:max-w-[320px] flex flex-col gap-8">
                <FloatLabel>
                    <InputText id="name" v-model="name" @input="nameError = false"
                        :class="{ 'error-input': nameError }" />
                    <label for="name">Nome</label>
                </FloatLabel>
                <FloatLabel>
                    <InputText id="email" v-model="email" @input="emailError = false"
                        :class="{ 'error-input': emailError }" />
                    <label for="email">E-mail</label>
                </FloatLabel>
                <FloatLabel>
                    <Textarea id="message" v-model="message" @input="messageError = false"
                        :class="{ 'error-input': messageError }" />
                    <label for="massage">Mensagem</label>
                </FloatLabel>
                <button type="submit" class="base-button !w-[120px] mx-auto">Enviar</button>
            </form>

            <a :href="utilsStore.addressLink" target="_blank"
                class="flex w-fit mx-auto md:mx-0 items-center gap-4 font-Barlow font-medium text-base text-white group duration-300 ease-linear hover:text-brand-orange mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    class="w-6 h-6 fill-white duration-300 ease-linear group-hover:scale-105 group-hover:fill-brand-orange">
                    <path fill-rule="evenodd"
                        d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                        clip-rule="evenodd" />
                </svg>

                {{ utilsStore.address }}
            </a>

            <a :href="`tel:${utilsStore.phoneNumber}`"
                class="flex w-fit mx-auto md:mx-0 items-center gap-2 font-Barlow font-medium text-base text-white group duration-300 ease-linear hover:text-brand-orange">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    class="w-6 h-6 fill-white duration-300 ease-linear group-hover:scale-105 group-hover:fill-brand-orange">
                    <path fill-rule="evenodd"
                        d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
                        clip-rule="evenodd" />
                </svg>

                {{ utilsStore.phoneNumber }}
            </a>
        </div>
    </section>
</template>