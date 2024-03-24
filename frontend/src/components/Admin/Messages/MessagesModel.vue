<script>
import { RunAlertMixin } from '../../../mixins/RunAlertMixin';
import { useUtilsStore } from '../../../stores/utils';

import ConfirmModal from '../Modals/ConfirmModal.vue';
import BaseLoader from '../../UI/BaseLoader.vue';

import axios from 'axios';

export default {
    mixins: [RunAlertMixin],
    components: { ConfirmModal, BaseLoader },
    setup() {
        const utilsStore = useUtilsStore();

        return {
            utilsStore
        };
    },
    data() {
        return {
            data: null,
            deleteModal: false,
        }
    },
    methods: {
        async getMessage() {
            const currentPathname = window.location.pathname;
            const pathSegments = currentPathname.split('/');

            try {
                let domain = useUtilsStore().domain;
                const response = await axios.get(`${domain}/api/messages/${pathSegments[pathSegments.length - 1]}`);

                this.data = response.data;

                // console.log(this.getDay(this.data.createdAt));

                if (this.data.status.toLowerCase() === 'new') {
                    try {
                        let data = {
                            status: 'read',
                            id: this.data.id,
                        }
                        await axios
                            .post(`${domain}/api/messages/set-status`, {
                                data
                            })
                            .then(() => {
                                console.log('Message Read')
                            });
                    } catch (error) {
                        console.error(error.code);
                    }
                }
            } catch (error) {
                console.error(error.code);
            }
        },
        async deleteMessage() {
            try {
                let domain = this.utilsStore.domain;
                await axios.post(`${domain}/api/messages/delete/${this.data.id}`).then(() => {
                    this.runAlert('success', 'Mensagem Excluído', '', 3000);
                    this.$router.push('/admin/messages')
                });

            } catch (error) {
                console.error(error.code);
                this.runAlert('error', 'Erro', 'Tente mais tarde', 3000);
            }
        },

        getDay(date) {
            const currentDate = new Date(date._seconds * 1000 + date._nanoseconds / 1e6);

            const today = new Date().toLocaleDateString('pt-PT');
            const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('pt-PT');

            let dayString = '';

            if (today === currentDate.toLocaleDateString('pt-PT')) {
                dayString = 'Hoje';
            } else if (yesterday === currentDate.toLocaleDateString('pt-PT')) {
                dayString = 'Ontem';
            } else {
                dayString = currentDate.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });
            }

            return dayString;
        }
    },
    async mounted() {
        await this.getMessage();
    }
}
</script>

<template>
    <transition name="popup">
        <ConfirmModal v-if="deleteModal" :title="'Confirmação de Exclusão'"
            :question="'Tem certeza de que deseja excluir esta Mensagem?'" @confirm_action="deleteMessage()"
            @cancel_action="deleteModal = false"></ConfirmModal>
    </transition>
    <section v-if="data" class="flex flex-col gap-6">
        <div class="flex justify-between">
            <router-link to="/admin/messages" class="base-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd"
                        d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                        clip-rule="evenodd" />
                </svg>

            </router-link>
            <div class="flex gap-4">

                <a :href="`mailto:${data.email}`" class="base-button gap-2 after:from-brand-blue after:to-brand-blue/80">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path
                            d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                        <path
                            d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                    </svg>

                    Responder
                </a>
                <button @click="deleteModal = true"
                    class="base-button after:from-brand-red after:to-brand-red/80 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd"
                            d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                            clip-rule="evenodd" />
                    </svg>

                    Excluir
                </button>
            </div>
        </div>
        <div class="w-fit">
            <h2 class="font-Barlow font-bold text-brand-black text-2xl uppercase">Mensagem</h2>
            <div class="w-1/3 h-1 bg-brand-orange"></div>
            <p class="font-Barlow font-semibold text-xl text-brand-gray mt-2">ID: {{ data.id }}</p>
        </div>

        <div class="bg-brand-gray-light p-6 rounded-md shadow-md">
            <p class="font-Barlow font-normal text-lg text-brand-black mb-2">Enviado: <span class="font-medium">{{ getDay(data.createdAt) }}</span></p>
            <p class="font-Barlow font-semibold text-lg text-brand-orange mb-5">{{ data.email }}</p>
            <p class="font-Barlow font-bold text-lg text-brand-black">Mensagem:</p>
            <p class="font-Barlow font-normal text-lg text-brand-black">{{ data.message }}</p>
        </div>
    </section>
    <BaseLoader v-else></BaseLoader>
</template>