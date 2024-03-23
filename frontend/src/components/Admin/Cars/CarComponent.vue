<script>
import { defineComponent } from 'vue';
import Galleria from 'primevue/galleria';
import Image from 'primevue/image';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

export default defineComponent({
    components: {
        Galleria,
        Image,
        TabView,
        TabPanel
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
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
    setup() {
        return {
            compilerOptions: {
                isCustomElement: tag => tag.startsWith('p-')
            }
        };
    }
})
</script>

<template>
    <div class="flex justify-between gap-8">
        <div class="">
            <div class="w-fit">
                <h2 class="font-Barlow font-bold text-brand-black text-2xl uppercase">{{ data.title }}</h2>
                <div class="w-1/3 h-1 bg-brand-orange"></div>
                <p class="font-Barlow font-semibold text-xl text-brand-gray mt-2">ID: {{ data.id }}</p>
            </div>
            <p class="font-Barlow font-medium text-lg text-brand-black/50 mt-8">Valor</p>
            <p class="font-Barlow font-bold text-2xl text-brand-orange">{{ data.price }}€</p>

            <p class="font-Barlow font-medium text-lg text-brand-black/50 mt-4">Ano</p>
            <p class="font-Barlow font-bold text-2xl text-brand-black">{{ data.details.find(el =>
                    el.title.toLowerCase() ===
                    'ano').value ? data.details.find(el => el.title.toLowerCase() ===
                        'ano').value : 'Não Especificado' }}</p>

            <p class="font-Barlow font-medium text-lg text-brand-black/50 mt-4">Quilometragem</p>
            <p class="font-Barlow font-bold text-2xl text-brand-black">{{ data.details.find(el =>
                    el.title.toLowerCase() ===
                    'quilómetros').value ? data.details.find(el => el.title.toLowerCase() ===
                        'quilómetros').value : 'Não Especificado' }} km</p>

            <p class="font-Barlow font-medium text-lg text-brand-black/50 mt-4">Combustível</p>
            <p class="font-Barlow font-bold text-2xl text-brand-black">{{ data.details.find(el =>
                    el.title.toLowerCase() ===
                    'combustível').value ? data.details.find(el => el.title.toLowerCase() ===
                        'combustível').value : 'Não Especificado' }}</p>
        </div>

        <Galleria v-if="data.images.length > 0":value="data.images.sort((a, b) => a.order - b.order)" :numVisible="4"
            :responsiveOptions="responsiveOptions">
            <template #item="slotProps">
                <Image :src="slotProps.item.url" alt="car" class="w-full duration-300 ease-linear group" preview />
            </template>
            <template #thumbnail="slotProps" v-if="data.images.length > 1">
                <img :src="slotProps.item.url" alt="car" />
            </template>
        </Galleria>
    </div>
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
</template>