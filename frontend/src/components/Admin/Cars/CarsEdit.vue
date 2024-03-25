<script>
import { RunAlertMixin } from '../../../mixins/RunAlertMixin';
import { useCarsStore } from '../../../stores/cars';
import { useUtilsStore } from '../../../stores/utils';

import ConfirmModal from '../Modals/ConfirmModal.vue';
import CarComponent from './CarComponent.vue';
import Image from 'primevue/image';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputNumber from 'primevue/inputnumber';
import FileUpload from 'primevue/fileupload';
import { Sortable } from "sortablejs-vue3";
import BaseLoader from '../../UI/BaseLoader.vue';
import axios from 'axios';

export default {
    mixins: [RunAlertMixin],
    components: {
        ConfirmModal,
        CarComponent,
        Image,
        TabView,
        TabPanel,
        InputText,
        InputGroup,
        InputGroupAddon,
        InputNumber,
        FileUpload,
        Sortable,
        BaseLoader
    },
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

            formData: {
                id: null,
                title: null,
                price: null,
                status: 'active',
                images: [],
                details: [
                    {
                        title: 'Tipo de veículo',
                        value: null
                    },
                    {
                        title: 'Ano',
                        value: null
                    },
                    {
                        title: 'Mês',
                        value: null
                    },
                    {
                        title: 'Quilómetros',
                        value: null
                    },
                    {
                        title: 'Tipo de caixa',
                        value: null
                    },
                    {
                        title: 'Combustível',
                        value: null
                    },
                    {
                        title: 'Fabricante',
                        value: null
                    },
                    {
                        title: 'Modelo',
                        value: null
                    },
                    {
                        title: 'Cor',
                        value: null
                    },
                    {
                        title: 'Cilindrada (cm³)',
                        value: null
                    },
                    {
                        title: 'Potência (cv)',
                        value: null
                    }
                ],
                equipment: [],
                additional: [],
                showOnBanner: false,
            },

            requiredFields: [
                'Tipo de veículo',
                'Ano',
                'Mês',
                'Quilómetros',
                'Tipo de caixa',
                'Combustível',
                'Fabricante',
                'Modelo',
                'Cor',
                // 'Cilindrada (cm³)',
                'Potência (cv)'
            ],

            validation: {
                emptyFields: [],
                emptyDetails: [],
                emptyEquipment: [],
                emptyAdditional: [],
                emptyImages: false,
            },

            uploadedImages: [],
            deletedImages: [],

            step: null,
            stepBefore: null,
            isChanges: false,

            order: 0,

            deleteModal: false,
            title: null,
            question: null,
        }
    },
    methods: {
        async getCar() {
            const currentPathname = window.location.pathname;
            const pathSegments = currentPathname.split('/');

            if (pathSegments[pathSegments.length - 1] !== 'new') {
                let car = await this.carsStore.getById(pathSegments[pathSegments.length - 1]);

                this.data = { ...car };
                this.formData = { ...car };
                this.formData.images = car.images.sort((a, b) => a.order - b.order);

                this.formData.images.forEach((image, index) => {
                    image.order = index;
                });

                this.order = [...this.formData.images].pop().order;

            } else {
                const id = `${new Date().getTime()}${Math.random().toString(36).substring(2, 24)}`;
                this.step = 1;
                this.isChanges = true;
                this.formData.id = id.toUpperCase();
                this.formData.status = 'inactive';
            }
        },

        async updateCar() {
            if (this.step == 3) {
                this.formData.status = 'active';
            }

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

                return;
            }

            try {
                let domain = this.utilsStore.domain;

                await axios.post(`${domain}/api/cars/update`, {
                    data: this.formData,
                    deletedImages: this.deletedImages.length > 0 ? this.deletedImages : null,
                }).then(async () => {
                    this.runAlert('success', 'Sucesso', '', 3000);
                    if (this.step) {
                        if (this.step == 3) {
                            this.$router.push('/admin/cars/')
                        } else {
                            this.step = this.step + 1;
                        }
                    } else this.$router.go();
                });
            } catch (error) {
                console.error(error);
                this.cancelChanges();
                this.runAlert('error', 'Erro', 'Tente mais tarde', 3000);
            }
        },

        onSortEnd(event) {
            const elOne = this.formData.images.find(el => el.order === event.newIndex);
            const elTwo = this.formData.images.find(el => el.order === event.oldIndex);

            [elOne.order, elTwo.order] = [event.oldIndex, event.newIndex];
        },

        addDetails() {
            this.formData.details.push({
                title: null,
                value: null,
            })
        },

        addElement(list) {
            this.formData[list].push(null);
        },

        deleteElement(list, id) {
            if (list == 'images') {
                this.deletedImages.push(
                    this.formData.images[id].url
                );
            }

            this.formData[list].splice(id, 1)
        },

        validate() {
            this.validation = {
                emptyFields: [],
                emptyDetails: [],
                emptyEquipment: [],
                emptyAdditional: [],
                emptyImages: false,
            }

            for (const key in this.formData) {
                if (!this.formData[key] || (typeof this.formData[key] === 'string' && this.formData[key].trim().length === 0)) {
                    if (key !== 'showOnBanner') {
                        this.validation.emptyFields.push(key);
                    }

                };
            }

            this.formData.details.forEach((el, index) => {
                for (const key in el) {
                    if (!el[key] || (typeof el[key] === 'string' && el[key].trim().length === 0)) {
                        this.validation.emptyDetails.push(index);
                    };
                }
            });

            if (this.formData.equipment.length > 0) {
                this.formData.equipment.forEach((el, index) => {
                    if (!el || el.trim().length === 0) {
                        this.validation.emptyEquipment.push(index);
                    }

                });
            };

            if (this.formData.additional.length > 0) {
                this.formData.additional.forEach((el, index) => {
                    if (!el || el.trim().length === 0) {
                        this.validation.emptyAdditional.push(index);
                    }
                });
            };

            if (!this.step || this.step == 2) {
                this.validation.emptyImages = this.formData.images.length == 0 ? true : false;
            }
        },

        async onAdvancedUpload(event) {
            this.runAlert('success', 'Upload bem-sucedido', '', 3000);
            let car = await this.carsStore.getById(this.formData.id);
            this.formData.images = car.images.sort((a, b) => a.order - b.order);
        },

        uploadingError(event) {
            this.runAlert('error', 'Upload falhou', '', 3000);
        },

        removeFieldAlert(field) {
            this.validation.emptyFields = this.validation.emptyFields.filter(item => item !== field);
        },

        removeDetailAlert(field) {
            this.validation.emptyDetails = this.validation.emptyDetails.filter(item => item !== field);
        },

        removeEquipmentAlert(field) {
            this.validation.emptyEquipment = this.validation.emptyEquipment.filter(item => item !== field);
        },

        removeAdditionalAlert(field) {
            this.validation.emptyAdditional = this.validation.emptyAdditional.filter(item => item !== field);
        },

        cancelChanges() {
            if (this.step) {
                this.title = 'Confirmação de Exclusão',
                    this.question = 'Tem certeza de que deseja excluir este carro?'
                this.deleteModal = true;
            } else this.formData = { ...this.data };
        },

        stepBack() {
            if (!this.step || this.step == 1) {
                if (this.step == 1) {
                    this.title = 'Atenção!'
                    this.question = 'Se sair desta página, o carro será excluído.'
                    this.deleteModal = true;
                } else this.$router.push(`/admin/cars/${this.data.id}`);
            } else {
                this.stepBefore = this.step;
                this.step = this.step - 1;
            };
        },

        async deleteDraft() {
            if (this.step == 1 && !this.stepBefore) {
                this.$router.push('/admin/cars');
            } else {
                try {
                    let domain = this.utilsStore.domain;
                    await axios.post(`${domain}/api/cars/delete/${this.formData.id}`).then(() => {
                        this.runAlert('success', 'Carro Excluído', '', 3000);
                        this.$router.push('/admin/cars')
                    });

                } catch (error) {
                    console.error(error.code);
                    this.runAlert('error', 'Erro', 'Tente mais tarde', 3000);
                }
            }
        },
    },
    watch: {
        formData: {
            handler(newData, oldData) {
                this.isChanges = JSON.stringify(newData) === JSON.stringify(oldData);
            },
            deep: true,
        },
    },
    async mounted() {
        await this.getCar();
    }

}
</script>

<template>
    <transition name="popup">
        <ConfirmModal v-if="deleteModal" :title="title" :question="question" @confirm_action="deleteDraft()"
            @cancel_action="deleteModal = false"></ConfirmModal>
    </transition>
    <section v-if="formData" class="flex flex-col gap-12">
        <div v-if="step"
            class="flex justify-center items-center p-6 w-fit mx-auto bg-brand-gray-light rounded-md drop-shadow-lg">
            <div class=" w-8 h-8 flex items-center justify-center border-2 border-brand-orange rounded-full"
                :class="{ 'bg-brand-orange': step >= 1 }">
                <p v-if="step <= 1" class="font-inter font-bold text-xl text-white">1</p>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div class="w-[120px] h-1 bg-gradient-to-r"
                :class="{ 'from-brand-orange to-brand-gray/20': step == 1, 'from-brand-orange to-brand-orange': step > 1 }">
            </div>
            <div class=" w-8 h-8 flex items-center justify-center border-2 border-brand-gray/20 rounded-full"
                :class="{ 'bg-brand-orange': step >= 2 }">
                <p v-if="step <= 2" class="font-inter font-bold text-xl"
                    :class="{ 'text-white': step == 2, 'text-brand-orange': step < 2 }">2</p>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div class="w-[120px] h-1 bg-gradient-to-r"
                :class="{ 'from-brand-gray/20 to-brand-gray/20': step < 2, 'from-brand-orange to-brand-gray/20': step == 2, 'from-brand-orange to-brand-orange': step > 2 }">
            </div>
            <div class=" w-8 h-8 flex items-center justify-center border-2 border-brand-gray/20 rounded-full"
                :class="{ 'bg-brand-orange': step == 3 }">
                <p class="font-inter font-bold text-xl"
                    :class="{ 'text-white': step == 3, 'text-brand-orange': step < 3 }">3</p>
            </div>
        </div>

        <div class="flex justify-between">
            <div class="flex gap-4">
                <button @click="stepBack()" class="base-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd"
                            d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
                <div class="w-fit" v-if="step != 3">
                    <h2 class="font-Barlow font-bold text-brand-black text-2xl uppercase">{{ step ? 'Novo' : 'Editar' }}
                        Carro</h2>
                    <div class="w-1/3 h-1 bg-brand-orange"></div>
                    <p class="font-Barlow font-semibold text-xl text-brand-gray mt-2">ID: {{ this.formData.id }}</p>
                </div>
            </div>

            <div v-if="isChanges" class="flex gap-4">
                <button v-if="step && (step == 1 || step == 2)" @click="updateCar()"
                    class="base-button gap-2 after:from-brand-green after:to-brand-green/80">
                    Próxima Etapa
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd"
                            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
                <button v-if="!step || step == 3" @click="updateCar()"
                    class="base-button gap-2 after:from-brand-green after:to-brand-green/80">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd"
                            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                            clip-rule="evenodd" />
                    </svg>
                    Salvar
                </button>
                <button @click="cancelChanges()" class="base-button gap-2 after:from-brand-red after:to-brand-red/80">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd"
                            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                            clip-rule="evenodd" />
                    </svg>

                    Cancelar
                </button>
            </div>
        </div>

        <div v-if="!step || step == 1" class="flex flex-col gap-4 admin-form">
            <div class="flex w-full gap-6 items-center">
                <div class="w-full">
                    <div class="w-fit mb-4">
                        <h3 class="font-Barlow font-bold text-xl text-brand-black uppercase">Carro</h3>
                        <div class="w-1/2 h-1 bg-brand-orange"></div>
                    </div>
                    <InputGroup class="rounded-md" :class="{ 'error-input': validation.emptyFields.includes('title') }">
                        <InputGroupAddon>
                            <i class="pi pi-car text-brand-gray/50"></i>
                        </InputGroupAddon>
                        <InputText id="title" v-model="formData.title" @input="removeFieldAlert('title')" />
                    </InputGroup>
                </div>
                <div class="w-full max-w-[280px]">
                    <div class="w-fit mb-4">
                        <h3 class="font-Barlow font-bold text-xl text-brand-black uppercase">Preço</h3>
                        <div class="w-1/2 h-1 bg-brand-orange"></div>
                    </div>
                    <InputGroup class="rounded-md" :class="{ 'error-input': validation.emptyFields.includes('price') }">
                        <InputGroupAddon>
                            <p class="font-Barlow font-medium text-lg text-brand-gray/50 leading-3">€</p>
                        </InputGroupAddon>
                        <InputNumber id="price" v-model="formData.price" @input="removeFieldAlert('price')" />
                    </InputGroup>
                </div>
            </div>
            <div class="mt-6">
                <div class="flex justify-between">
                    <div class="w-fit">
                        <h3 class="font-Barlow font-bold text-xl text-brand-black uppercase">Detalhes</h3>
                        <div class="w-1/2 h-1 bg-brand-orange"></div>
                    </div>

                    <button @click="addDetails()" class="base-button gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                                clip-rule="evenodd" />
                        </svg>
                        Adicionar
                    </button>
                </div>

                <div class="grid grid-cols-2 gap-5 mt-4">
                    <div v-for="(el, id) in formData.details" :key="id" class="flex">
                        <div class="w-full"
                            :class="{ 'rounded-md': requiredFields.includes(el.title), 'rounded-l-md': !requiredFields.includes(el.title), 'error-input': validation.emptyDetails.includes(id) }">
                            <InputText v-model="el.title" @input="removeDetailAlert(id)"
                                :disabled="requiredFields.includes(el.title) || el.title === 'Cilindrada (cm³)'"
                                class="!rounded-tl-md capitalize !bg-brand-gray/5"
                                :class="{ '!rounded-tr-md !rounded-br-none pointer-events-none cursor-not-allowed': requiredFields.includes(el.title), '!rounded-r-none': !requiredFields.includes(el.title) }" />
                            <InputText v-model="el.value" @input="removeDetailAlert(id)" class="!rounded-bl-md"
                                :class="{ '!rounded-br-md !rounded-tr-none': requiredFields.includes(el.title), '!rounded-r-none': !requiredFields.includes(el.title) }" />
                        </div>
                        <button @click="deleteElement('details', id)" v-if="!requiredFields.includes(el.title)"
                            class="rounded-r-md bg-brand-gray py-2 px-3 duration-300 ease-linear hover:bg-brand-red">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                class="w-5 h-5">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div class="mt-6">
                <div class="flex justify-between">
                    <div class="w-fit">
                        <h3 class="font-Barlow font-bold text-xl text-brand-black uppercase">equipamento</h3>
                        <div class="w-1/2 h-1 bg-brand-orange"></div>
                    </div>

                    <button @click="addElement('equipment')" class="base-button gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                                clip-rule="evenodd" />
                        </svg>
                        Adicionar
                    </button>
                </div>

                <div class="grid grid-cols-2 gap-5 mt-4">
                    <div v-for="(el, id) in formData.equipment" :key="id" class="flex">
                        <InputText class="!rounded-l-md !rounded-r-none"
                            :class="{ 'error-input': validation.emptyEquipment.includes(id) }"
                            v-model="formData.equipment[id]" @input="removeEquipmentAlert(id)" />
                        <button @click="deleteElement('equipment', id)"
                            class="rounded-r-md bg-brand-gray py-2 px-3 duration-300 ease-linear hover:bg-brand-red">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                class="w-5 h-5">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div class="mt-6">
                <div class="flex justify-between">
                    <div class="w-fit">
                        <h3 class="font-Barlow font-bold text-xl text-brand-black uppercase">adicional</h3>
                        <div class="w-1/2 h-1 bg-brand-orange"></div>
                    </div>

                    <button @click="addElement('additional')" class="base-button gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                                clip-rule="evenodd" />
                        </svg>
                        Adicionar
                    </button>
                </div>

                <div class="grid grid-cols-2 gap-5 mt-4">
                    <div v-for="(el, id) in formData.additional" :key="id" class="flex">
                        <InputText class="!rounded-l-md !rounded-r-none" v-model="formData.additional[id]"
                            @input="removeAdditionalAlert(id)"
                            :class="{ 'error-input': validation.emptyAdditional.includes(id) }" />
                        <button @click="deleteElement('additional', id)"
                            class="rounded-r-md bg-brand-gray py-2 px-3 duration-300 ease-linear hover:bg-brand-red">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                class="w-5 h-5">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!step || step == 2">
            <div class="w-fit mb-4">
                <h3 class="font-Barlow font-bold text-xl text-brand-black uppercase">imagens</h3>
                <div class="w-1/2 h-1 bg-brand-orange"></div>
            </div>

            <FileUpload name="files" :url="`${utilsStore.domain}/api/cars/upload-images/cars/${formData.id}/${order}`"
                @upload="onAdvancedUpload" @error="uploadingError" :multiple="true" accept="image/*"
                :maxFileSize="5000000">
                <template #empty>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-32 h-32 stroke-brand-gray-light">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                    </svg>


                    <p class="font-Montserrat font-medium text-base text-brand-gray-light text-center px-4">
                        Drag and drop files
                        to here to upload.</p>
                </template>
            </FileUpload>

            <Sortable :list="formData.images" itemKey="list" @end="onSortEnd"
                class="w-full grid grid-cols-4 gap-3 mt-6 admin-images">
                <template #item="{ element, index }">
                    <div class="relative group">
                        <!-- <p class="absolute left-0 top-0 bg-brand-orange px-4 py-0.5 z-[2]">
                            {{ element.order }}
                        </p> -->
                        <button @click="deleteElement('images', index)"
                            class="absolute right-0 top-0 rounded-bl-xl bg-brand-red p-2 opacity-0 duration-300 ease-linear hover:scale-105 group-hover:opacity-100 z-[2]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                class="w-5 h-5">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                        <Image :src="element.url" :alt="index" preview />
                    </div>
                </template>
            </Sortable>
        </div>

        <div v-if="step == 3">
            <CarComponent :data="formData"></CarComponent>
        </div>
    </section>
    <BaseLoader v-else></BaseLoader>
</template>