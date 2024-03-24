<script>
import { useCarsStore } from '../../../stores/cars';

import Image from 'primevue/image';
import Dropdown from 'primevue/dropdown';
import Paginator from 'primevue/paginator';

import BaseLoader from '../../UI/BaseLoader.vue';

export default {
    setup() {
        const carsStore = useCarsStore();

        return {
            carsStore
        };
    },
    components: {
        Image,
        Dropdown,
        BaseLoader,
        Paginator
    },
    data() {
        return {
            data: null,
            itemsPerPage: 16,
            activePage: 0,

            statusesStyles: {
                active: 'from-brand-green/40 to-brand-green/30 border border-brand-green text-brand-green',
                inactive: 'from-brand-blue/40 to-brand-blue/30 border border-brand-blue text-brand-blue',
                sold: 'from-brand-orange/20 to-brand-orange/10 border border-brand-orange text-brand-orange'
            },
            statuses: [
                { name: 'Ativo', code: 'active' },
                { name: 'Inativo', code: 'inactive' },
                { name: 'Vendido', code: 'sold' },
            ],

            searchedTerm: null,
            searchedStatus: null,
        }
    },
    methods: {
        async getAll() {
            this.data = await this.carsStore.getAll();
        },
        getPage(event) {
            this.scrollToTop()
            this.activePage = event.page;
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    },
    async mounted() {
        await this.getAll()
    },
    computed: {
        filteredData() {

            if (this.data) {
                let list = [...this.data];
                let data = [];

                if (this.searchedTerm) {
                    this.activePage = 0;
                    list = list.filter(car =>
                        car.id.toString().toUpperCase() === this.searchedTerm.trim().toUpperCase() ||
                        car.title.toLowerCase().includes(this.searchedTerm.toLowerCase())
                    );
                }

                if (this.searchedStatus) {
                    this.activePage = 0;
                    list = list.filter(car =>
                        car.status.toLowerCase() === this.searchedStatus.code.toLowerCase()
                    );
                }

                for (let i = 0; i < list.length; i += this.itemsPerPage) {
                    data.push(list.slice(i, i + this.itemsPerPage));
                }

                return data
            } else return []
        },
    },
}
</script>

<template>
    <section class="flex flex-col gap-8">
        <div class="flex justify-between">
            <div class="w-fit">
                <h2 class="font-Barlow font-bold text-brand-black text-3xl md:text-4xl uppercase">Carros</h2>
                <div class="w-1/3 h-1 bg-brand-orange"></div>
            </div>

            <router-link to="/admin/cars/new" class="base-button gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                        clip-rule="evenodd" />
                </svg>
                Adicionar Carro
            </router-link>
        </div>

        <div class="w-full flex gap-4 items-center">
            <div class="relative w-full">
                <input v-model="searchedTerm" type="text"
                    class="w-full rounded-md h-[52px] bg-white px-12 py-4 font-Barlow font-medium text-base text-brand-black border-2 border-brand-gray-light placeholder:text-brand-black focus:outline-none focus:border-brand-orange shadow-sm"
                    placeholder="Pesquise por ID ou Nome do carro">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    class="w-5 h-5 fill-brand-black absolute top-1/2 -translate-y-1/2 left-4">
                    <path fill-rule="evenodd"
                        d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                        clip-rule="evenodd" />
                </svg>

                <a v-if="searchedTerm" href="#" @click.prevent="searchedTerm = null"
                    class="absolute top-1/2 -translate-y-1/2 right-4 duration-300 ease-linear hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        class="w-5 h-5 fill-brand-gray">
                        <path
                            d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                    </svg>
                </a>
            </div>

            <!-- <button type="submit" v-if="searchedTerm"
                class="w-[120px] h-[52px] rounded-md bg-brand-orange block font-Barlow font-semibold text-lg text-white capitalize duration-300 ease-linear hover:grayscale">
                Procurar
            </button> -->
        </div>

        <div class="flex flex-col gap-3">
            <div
                class="w-full grid grid-cols-[200px_180px_1fr_120px_120px_120px] bg-brand-gray border-b-2 border-brand-orange rounded-md items-center">

                <Dropdown v-model="searchedStatus" :options="statuses" showClear optionLabel="name" placeholder="status"
                    class="w-full font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase bg-transparent placeholder:text-white focus:outline-none focus:border-none" />
                <p
                    class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    Imagem</p>
                <p
                    class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    Carro</p>
                <p
                    class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    Ano</p>
                <p
                    class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    Preço</p>
                <p
                    class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    Ações</p>
            </div>

            <div v-if="data" class="flex flex-col gap-2">
                <div v-for="car in filteredData[activePage]" :key="car.id"
                    class="w-full grid grid-cols-[200px_180px_1fr_120px_120px_120px] bg-white rounded-md shadow-xl items-center border-t-2 border-brand-gray-light/50">
                    <div class="py-2 px-4">
                        <p class="font-Barlow font-bold text-sm uppercase bg-gradient-to-r w-fit px-2 py-1 rounded-lg "
                            :class="statusesStyles[car.status]">{{ car.status === 'active' ? 'Ativo' : car.status ===
                    'inactive' ? 'Inativo' : 'Vendido' }}</p>
                    </div>

                    <div class="py-2 px-4">
                        <Image v-if="car.images.length > 0" :src="car.images.find(el => el.order == 1).url" alt="car"
                            preview class="w-full h-[86px] object-cover rounded-md" />
                        <img v-else src="https://placehold.co/180x86?text=Placeholder" alt="#"
                            class="w-full h-[86px] object-cover rounded-md">
                    </div>
                    <p class="font-Barlow font-medium text-lg text-brand-black py-2 px-4">{{ car.title }}</p>
                    <p class="font-Barlow font-medium text-lg text-brand-black py-2 px-4">{{ car.details.find(el =>
                    el.title.toLowerCase() === 'ano').value }}</p>
                    <p class="font-Barlow font-bold text-lg text-brand-orange py-2 px-4">{{ car.price }}€</p>
                    <router-link :to="`/admin/cars/${car.id}`" class="py-2 px-4 w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            class="w-7 h-7 fill-brand-black duration-300 ease-linear hover:scale-105 hover:fill-brand-orange">
                            <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                            <path fill-rule="evenodd"
                                d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                                clip-rule="evenodd" />
                        </svg>
                    </router-link>
                </div>
                <Paginator v-if="filteredData.length > 1" @page="getPage" :rows="1" :totalRecords="filteredData.length"
                    template="PrevPageLink PageLinks NextPageLink">
                </Paginator>
            </div>
            <BaseLoader v-else></BaseLoader>
        </div>
    </section>
</template>