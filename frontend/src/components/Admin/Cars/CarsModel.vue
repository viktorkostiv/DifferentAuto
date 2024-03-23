<script>

import { RunAlertMixin } from '../../../mixins/RunAlertMixin';
import { useCarsStore } from '../../../stores/cars';
import { useUtilsStore } from '../../../stores/utils';

import ConfirmModal from '../Modals/ConfirmModal.vue';
import CarComponent from './CarComponent.vue';
import Checkbox from 'primevue/checkbox';
import BaseLoader from '../../UI/BaseLoader.vue';
import axios from 'axios';

export default {
    mixins: [RunAlertMixin],
    components: { ConfirmModal, CarComponent, Checkbox, BaseLoader },
    setup() {
        const carsStore = useCarsStore();
        const utilsStore = useUtilsStore();

        return {
            carsStore,
            utilsStore
        };
    },
    data() {
        return {
            data: null,
            isDataLoaded: false,
            deleteModal: false,

            validation: {
                emptyFields: [],
                emptyDetails: [],
                emptyEquipment: [],
                emptyAdditional: [],
                emptyImages: false,
            },
        }
    },
    methods: {
        async getCar() {
            const currentPathname = window.location.pathname;
            const pathSegments = currentPathname.split('/');

            this.data = await this.carsStore.getById(pathSegments[pathSegments.length - 1]);
            if(this.data){
                this.isDataLoaded = true;
            }
        },

        async setStatus(status) {
            this.validate();

            if (this.validation.emptyFields.length > 0 ||
                this.validation.emptyDetails.length > 0 ||
                this.validation.emptyEquipment.length > 0 ||
                this.validation.emptyAdditional > 0 ||
                this.validation.emptyImages) {

                if (this.validation.emptyImages) {
                    this.runAlert('error', 'Imagens não adicionadas', 'Adicione pelo menos uma imagem', 4000);
                }

                if (this.validation.emptyFields.length > 0 ||
                    this.validation.emptyDetails.length > 0 ||
                    this.validation.emptyEquipment.length > 0 ||
                    this.validation.emptyAdditional > 0) {
                    this.runAlert('error', 'Erro de validação', 'Existem campos em branco no formulário', 4000);
                }

                console.log(this.validation)
                return;
            }

            try {
                let domain = this.utilsStore.domain;
                let data = {
                    status,
                    id: this.data.id,
                }
                await axios
                    .post(`${domain}/api/cars/set-status`, {
                        data
                    })
                    .then(() => {
                        this.runAlert('success', 'Sucesso', '', 3000);
                        this.$router.go()
                    });
            } catch (error) {
                console.error(error.code);
                this.runAlert('error', 'Erro', 'Tente mais tarde', 3000);
            }
        },

        async deleteCar() {
            try {
                let domain = this.utilsStore.domain;
                await axios.post(`${domain}/api/cars/delete/${this.data.id}`).then(() => {
                    this.runAlert('success', 'Carro Excluído', '', 3000);
                    this.$router.push('/admin/cars')
                });

            } catch (error) {
                console.error(error.code);
                this.runAlert('error', 'Erro', 'Tente mais tarde', 3000);
            }
        },

        async showOnBanner(value) {
            this.validate();

            if (this.validation.emptyFields.length > 0 ||
                this.validation.emptyDetails.length > 0 ||
                this.validation.emptyEquipment.length > 0 ||
                this.validation.emptyAdditional > 0 ||
                this.validation.emptyImages) {

                if (this.validation.emptyImages) {
                    this.runAlert('error', 'Imagens não adicionadas', 'Adicione pelo menos uma imagem', 4000);
                }

                if (this.validation.emptyFields.length > 0 ||
                    this.validation.emptyDetails.length > 0 ||
                    this.validation.emptyEquipment.length > 0 ||
                    this.validation.emptyAdditional > 0) {
                    this.runAlert('error', 'Erro de validação', 'Existem campos em branco no formulário', 4000);
                }

                console.log(this.validation)
                return;
            }

            try {
                let domain = this.utilsStore.domain;
                let data = {
                    showOnBanner: value,
                    id: this.data.id,
                }
                await axios
                    .post(`${domain}/api/cars/show-on-banner`, {
                        data
                    })
                    .then(() => {
                        this.runAlert('success', 'Sucesso', '', 3000);
                    });
            } catch (error) {
                console.error(error.code);
                this.runAlert('error', 'Erro', 'Tente mais tarde', 3000);
            }
        },

        validate() {
            this.validation = {
                emptyFields: [],
                emptyDetails: [],
                emptyEquipment: [],
                emptyAdditional: [],
                emptyImages: false,
            }

            for (const key in this.data) {
                if (!this.data[key] || (typeof this.data[key] === 'string' && this.data[key].trim().length === 0)) {
                    if (key !== 'showOnBanner') {
                        this.validation.emptyFields.push(key);
                    }

                };
            }

            this.data.details.forEach((el, index) => {
                for (const key in el) {
                    if (!el[key] || (typeof el[key] === 'string' && el[key].trim().length === 0)) {
                        this.validation.emptyDetails.push(index);
                    };
                }
            });

            if (this.data.equipment.length > 0) {
                this.data.equipment.forEach((el, index) => {
                    if (!el || el.trim().length === 0) {
                        this.validation.emptyEquipment.push(index);
                    }

                });
            };

            if (this.data.additional.length > 0) {
                this.data.additional.forEach((el, index) => {
                    if (!el || el.trim().length === 0) {
                        this.validation.emptyAdditional.push(index);
                    }
                });
            };

            this.validation.emptyImages = this.data.images.length == 0 ? true : false;
        },
    },
    async mounted() {
        await this.getCar();
    }
}
</script>

<template>
    <transition name="popup">
        <ConfirmModal v-if="deleteModal" :title="'Confirmação de Exclusão'"
            :question="'Tem certeza de que deseja excluir este carro?'" @confirm_action="deleteCar()"
            @cancel_action="deleteModal = false"></ConfirmModal>
    </transition>
    <section v-if="data" class="flex flex-col gap-6">
        <div class="flex justify-between">
            <router-link to="/admin/cars" class="base-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd"
                        d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                        clip-rule="evenodd" />
                </svg>

            </router-link>
            <div class="flex gap-4">

                <div v-if="data.status === 'active'" class="flex gap-4">
                    <button @click="setStatus('sold')"
                        class="base-button gap-2 after:from-brand-green after:to-brand-green/80">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                                clip-rule="evenodd" />
                        </svg>

                        Vendido
                    </button>
                    <button @click="setStatus('inactive')"
                        class="base-button gap-2 after:from-brand-red after:to-brand-red/80">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm5-2.25A.75.75 0 0 1 7.75 7h.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75v-4.5Zm4 0a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75v-4.5Z"
                                clip-rule="evenodd" />
                        </svg>

                        Desativar
                    </button>
                </div>
                <button v-else @click="setStatus('active')" class="base-button gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd"
                            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                            clip-rule="evenodd" />
                    </svg>
                    Vender
                </button>
                <router-link :to="`/admin/cars/edit/${data.id}`"
                    class="base-button gap-2 after:from-brand-blue after:to-brand-blue/80">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path
                            d="M10 3.75a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM17.25 4.5a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM5 3.75a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM4.25 17a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM17.25 17a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM9 10a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1 0-1.5h5.5A.75.75 0 0 1 9 10ZM17.25 10.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM14 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM10 16.25a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
                    </svg>
                    Editar
                </router-link>
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
        <div v-if="data.status === 'active'" class="mb-4 flex items-center gap-6">
            <p class="font-Barlow font-semibold text-xl text-brand-black">Mostrar no Banner ?</p>
            <Checkbox v-model="data.showOnBanner" @input="showOnBanner(data.showOnBanner)" :binary="true" />
        </div>
        <p v-else
            class="mb-4 font-Barlow font-bold text-2xl rounded-tl-md rounded-br-md px-4 py-1 w-fit border bg-gradient-to-r"
            :class="{ 'from-brand-orange/40 to-brand-orange/30 border-brand-orange text-brand-orange': data.status === 'sold', 'from-brand-blue/40 to-brand-blue/30 border-brand-blue text-brand-blue': data.status === 'inactive' }">
            {{ data.status === 'inactive' ? 'Inativo' : 'Vendido' }}</p>
        <CarComponent :data="data"></CarComponent>
    </section>
    <BaseLoader v-else></BaseLoader>
</template>