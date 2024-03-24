<script>
import { useUtilsStore } from '../../../stores/utils';

import Paginator from 'primevue/paginator';
import BaseLoader from '../../UI/BaseLoader.vue';

import axios from 'axios';
export default {
    components: { BaseLoader, Paginator },
    setup() {
        const utilsStore = useUtilsStore();

        return {
            utilsStore
        };
    },
    data() {
        return {
            data: null,
            itemsPerPage: 24,
            activePage: 0,
            searchedTerm: null,
        }
    },
    methods: {
        async getAll() {
            try {
                let domain = this.utilsStore.domain;
                const response = await axios.get(`${domain}/api/messages`);

                this.data = response.data;
            } catch (error) {
                console.error(error.code);
            }
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
        },
        shortenString(inputString) {
            inputString = String(inputString);

            if (inputString.length <= 30) {
                return inputString;
            } else {
                return inputString.substring(0, 27) + '...';
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
        await this.getAll()
    },
    computed: {
    filteredData() {
        if (this.data) {
            let list = [...this.data];
            let data = [];

            if (this.searchedTerm) {
                this.activePage = 0;
                list = list.filter(message =>
                    message.id.toString().toUpperCase() === this.searchedTerm.trim().toUpperCase() ||
                    message.email.toLowerCase().includes(this.searchedTerm.toLowerCase())
                );
            }

            list.sort((a, b) => {
                const dateA = new Date(a.createdAt._seconds * 1000 + a.createdAt._nanoseconds / 1e6);
                const dateB = new Date(b.createdAt._seconds * 1000 + b.createdAt._nanoseconds / 1e6);

                return dateB - dateA;
            });

            for (let i = 0; i < list.length; i += this.itemsPerPage) {
                data.push(list.slice(i, i + this.itemsPerPage));
            }

            return data;
        } else {
            return [];
        }
    },
},
}
</script>

<template>
    <section class="flex flex-col gap-8">
        <div class="w-fit">
            <h2 class="font-Barlow font-bold text-brand-black text-3xl md:text-4xl uppercase">mensagens</h2>
            <div class="w-1/3 h-1 bg-brand-orange"></div>
        </div>
        <div class="w-full flex gap-4 items-center">
            <div class="relative w-full">
                <input v-model="searchedTerm" type="text"
                    class="w-full rounded-md h-[52px] bg-white px-12 py-4 font-Barlow font-medium text-base text-brand-black border-2 border-brand-gray-light placeholder:text-brand-black focus:outline-none focus:border-brand-orange shadow-sm"
                    placeholder="Pesquise por ID ou E-mail">
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
                class="w-full grid grid-cols-[120px_180px_280px_1fr_120px] bg-brand-gray border-b-2 border-brand-orange rounded-md ">
                <p
                    class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    status</p>
                <p
                    class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    Data</p>
                <p
                    class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    Email</p>
                <p
                    class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    MENSAGEN</p>
                <p
                    class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    Ações</p>
            </div>

            <div class="flex flex-col gap-2">
                <div v-for="el in filteredData[activePage]" :key="el.id"
                    class="w-full grid grid-cols-[120px_180px_280px_1fr_120px] bg-white rounded-md shadow-xl items-center border-t-2 border-brand-gray-light/50">
                    <div class="py-2 px-4">
                        <svg v-if="el.status.toLowerCase() === 'new'" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 fill-brand-orange">
                            <path
                                d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                            <path
                                d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            class="w-5 h-5 fill-brand-green">
                            <path fill-rule="evenodd"
                                d="M2.106 6.447A2 2 0 0 0 1 8.237V16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.236a2 2 0 0 0-1.106-1.789l-7-3.5a2 2 0 0 0-1.788 0l-7 3.5Zm1.48 4.007a.75.75 0 0 0-.671 1.342l5.855 2.928a2.75 2.75 0 0 0 2.46 0l5.852-2.927a.75.75 0 1 0-.67-1.341l-5.853 2.926a1.25 1.25 0 0 1-1.118 0l-5.856-2.928Z"
                                clip-rule="evenodd" />
                        </svg>

                    </div>
                    <p class="font-Barlow font-medium text-lg text-brand-black py-2 px-4">{{ getDay(el.createdAt) }}</p>
                    <p class="font-Barlow font-medium text-lg text-brand-black py-2 px-4">{{ shortenString(el.email) }}
                    </p>
                    <p class="font-Barlow font-medium text-lg text-brand-black py-2 px-4">{{ shortenString(el.message)
                        }}</p>
                    <router-link :to="`/admin/messages/${el.id}`" class="py-2 px-4 w-fit">
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
        </div>
    </section>
</template>