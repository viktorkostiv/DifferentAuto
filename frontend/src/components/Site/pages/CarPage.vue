<script>
import { useCarsStore } from '../../../stores/cars';
import { useUtilsStore } from '../../../stores/utils';
import Galleria from 'primevue/galleria';
import Image from 'primevue/image';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import BaseLoader from '../../UI/BaseLoader.vue';

export default {
    setup() {
        const carsStore = useCarsStore();
        const utilsStore = useUtilsStore();

        return {
            carsStore,
            utilsStore
        };
    },
    components: { Galleria, Image, TabView, TabPanel, BaseLoader },
    data() {
        return {
            data: null,

            responsiveOptions: [
                {
                    breakpoint: '630px',
                    numVisible: 3
                },
                {
                    breakpoint: '500px',
                    numVisible: 2
                },
            ],

        }
    },
    methods: {
        async getCar() {
            const currentPathname = window.location.pathname;
            const pathSegments = currentPathname.split('/');

            this.data = await this.carsStore.getById(pathSegments[pathSegments.length - 1]);
        },
    },
    async mounted() {
        await this.getCar();
    }
}
</script>

<template>
    <section v-if="data" class="max-w-[1220px] w-full mx-auto px-4 py-12">
        <div class="flex flex-col lg:flex-row gap-8 justify-between">
            <div class="order-2 lg:order-1">
                <div class="w-fit">
                    <h2 class="font-Barlow font-bold text-brand-black text-2xl md:text-3xl uppercase">{{ data.title }}
                    </h2>
                    <div class="w-1/3 h-1 bg-brand-orange"></div>
                </div>
                <p class="font-Barlow font-normal text-xl text-brand-black mt-4">
                    {{ data.details.find(el => el.title.toLowerCase() === 'ano').value }}
                    &#x2022;
                    {{ data.details.find(el => el.title.toLowerCase() === 'quilómetros').value }}km
                    &#x2022;
                    {{ data.details.find(el => el.title.toLowerCase() === 'combustível').value }}</p>
                <p class="font-Barlow font-medium text-lg text-brand-black/50 mt-12">Valor</p>
                <p class="font-Barlow font-bold text-2xl text-brand-orange mb-8">{{ data.price }}€</p>
                <a href=""
                    class="font-Barlow font-medium text-lg text-brand-black/50 underline duration-300 ease-linear hover:text-brand-orange">
                    Calcular o empréstimo
                </a>
                <div class="flex gap-3 mt-12 lg:mt-24">
                    <a :href="`mailto:${utilsStore.email}`" class="base-button gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                d="M5.404 14.596A6.5 6.5 0 1 1 16.5 10a1.25 1.25 0 0 1-2.5 0 4 4 0 1 0-.571 2.06A2.75 2.75 0 0 0 18 10a8 8 0 1 0-2.343 5.657.75.75 0 0 0-1.06-1.06 6.5 6.5 0 0 1-9.193 0ZM10 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
                                clip-rule="evenodd" />
                        </svg>

                        E-mail
                    </a>
                    <a :href="`tel:${utilsStore.phoneNumber}`" class="base-button gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            class="w-5 h-5 fill-white duration-300 ease-linear group-hover:scale-125 group-hover:fill-brand-orange">
                            <path fill-rule="evenodd"
                                d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
                                clip-rule="evenodd" />
                        </svg>
                        Telemovel
                    </a>
                </div>
            </div>
            <div class="order-1 lg:order-2 mx-auto lg:mx-0">
                <Galleria v-if="data.images.length > 1" :value="data.images.sort((a, b) => a.order - b.order)"
                    :numVisible="4" :responsiveOptions="responsiveOptions" :showItemNavigators="true">
                    <template #item="slotProps">
                        <Image :src="slotProps.item.url" alt="car" class="w-full duration-300 ease-linear group"
                            preview />
                    </template>
                    <template #thumbnail="slotProps">
                        <img :src="slotProps.item.url" alt="car"/>
                    </template>
                </Galleria>
                <Image v-else :src="data.images[0].url" alt="car"
                    class="w-full duration-300 ease-linear group max-w-[620px] xl:max-w-[720px] w-full" preview />
            </div>
        </div>

        <div class="mt-12">
            <TabView>
                <TabPanel header="Detalhes" v-if="data.details && data.details.length > 0">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-5">
                        <div v-for="el, id in data.details" :key="id" class="w-full flex gap-8 justify-between">
                            <p class="font-Barlow font-medium text-lg text-brand-black capitalize">{{ el.title }} :</p>
                            <p class="font-Barlow font-bold text-lg text-brand-black">{{ el.value }}</p>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Equipamento" v-if="data.equipment && data.equipment.length > 0">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-5">
                        <p v-for="el, id in data.equipment" :key="id"
                            class="font-Barlow font-semibold text-lg text-brand-black">
                            &#x2022; {{ el }}</p>
                    </div>
                </TabPanel>
                <TabPanel header="Additional" v-if="data.additional && data.additional.length > 0">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-5">
                        <p v-for="el, id in data.additional" :key="id"
                            class="font-Barlow font-semibold text-lg text-brand-black">
                            &#x2022; {{ el }}</p>
                    </div>
                </TabPanel>
            </TabView>
        </div>
    </section>
    <BaseLoader v-else></BaseLoader>
</template>