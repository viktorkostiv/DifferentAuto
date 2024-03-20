<script>
import Galleria from 'primevue/galleria';
import Image from 'primevue/image';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

export default {
    components: { Galleria, Image, TabView, TabPanel },
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
            images: [
                'https://firebasestorage.googleapis.com/v0/b/different-auto.appspot.com/o/0SQMYWCR8C9IKU9AGNK4%2F1-8055024753-citroen-picasso-c4-grand-picasso.jpg?alt=media&token=a3795565-b7eb-434b-93cb-8584f9ef8b44',
                'https://firebasestorage.googleapis.com/v0/b/different-auto.appspot.com/o/0SQMYWCR8C9IKU9AGNK4%2F2-8014687986-citroen-picasso-c4-grand-picasso.jpg?alt=media&token=1f467a5e-49ee-4ba1-9a21-e85be7cb14a3',
                'https://firebasestorage.googleapis.com/v0/b/different-auto.appspot.com/o/0SQMYWCR8C9IKU9AGNK4%2F3-8055128897-citroen-picasso-c4-grand-picasso.jpg?alt=media&token=d2c1637b-dec4-47fd-8795-755e528c183d',
                'https://firebasestorage.googleapis.com/v0/b/different-auto.appspot.com/o/0SQMYWCR8C9IKU9AGNK4%2F4-8023315449-citroen-picasso-c4-grand-picasso.jpg?alt=media&token=3656b611-7e2b-43c0-b1f6-47726da8f83c',
                'https://firebasestorage.googleapis.com/v0/b/different-auto.appspot.com/o/0SQMYWCR8C9IKU9AGNK4%2F5-8091010152-citroen-picasso-c4-grand-picasso.jpg?alt=media&token=79081046-f1e1-464f-8def-1ae316e7ae69',
                'https://firebasestorage.googleapis.com/v0/b/different-auto.appspot.com/o/0SQMYWCR8C9IKU9AGNK4%2F6-8099533471-citroen-picasso-c4-grand-picasso.jpg?alt=media&token=4f2c5dd4-7d27-43c0-bab8-17739641f2ea',
                'https://firebasestorage.googleapis.com/v0/b/different-auto.appspot.com/o/0SQMYWCR8C9IKU9AGNK4%2F7-8025595277-citroen-picasso-c4-grand-picasso.jpg?alt=media&token=322c8278-0a4e-4176-b602-cbb733bd1b72',
                'https://firebasestorage.googleapis.com/v0/b/different-auto.appspot.com/o/0SQMYWCR8C9IKU9AGNK4%2F8-8085258510-citroen-picasso-c4-grand-picasso.jpg?alt=media&token=d05cff48-d003-4f2e-b172-452c6b63716c',
            ]
        }
    }
}
</script>

<template>
    <section class="flex flex-col gap-6">
        <div class="flex justify-between">
            <router-link to="/admin/cars" class="base-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd"
                        d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                        clip-rule="evenodd" />
                </svg>

            </router-link>
            <button class="base-button gap-2 after:from-brand-blue after:to-brand-blue/80">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path
                        d="M10 3.75a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM17.25 4.5a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM5 3.75a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM4.25 17a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM17.25 17a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM9 10a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1 0-1.5h5.5A.75.75 0 0 1 9 10ZM17.25 10.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM14 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM10 16.25a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
                </svg>
                Editar
            </button>
        </div>
        <div class="flex justify-between">
            <div class="">
                <div class="w-fit">
                    <h2 class="font-Barlow font-bold text-brand-black text-2xl uppercase">Citroën Picasso C4 Grand
                        Picasso - 09</h2>
                    <div class="w-1/3 h-1 bg-brand-orange"></div>
                    <p class="font-Barlow font-semibold text-xl text-brand-gray mt-2">ID: 0SQMYWCR8C9IKU9AGNK4</p>
                </div>
                <p class="font-Barlow font-medium text-lg text-brand-black/50 mt-8">Valor</p>
                <p class="font-Barlow font-bold text-2xl text-brand-orange">42 500 $</p>

                <p class="font-Barlow font-medium text-lg text-brand-black/50 mt-4">Ano</p>
                <p class="font-Barlow font-bold text-2xl text-brand-black">2021</p>

                <p class="font-Barlow font-medium text-lg text-brand-black/50 mt-4">Quilometragem</p>
                <p class="font-Barlow font-bold text-2xl text-brand-black">8 000km</p>

                <p class="font-Barlow font-medium text-lg text-brand-black/50 mt-4">Combustível</p>
                <p class="font-Barlow font-bold text-2xl text-brand-black">Diesel</p>
            </div>

            <Galleria :value="images" :numVisible="4" :responsiveOptions="responsiveOptions">
                <template #item="slotProps">
                    <Image :src="slotProps.item" alt="car" class="w-full duration-300 ease-linear group" preview />
                </template>
                <template #thumbnail="slotProps">
                    <img :src="slotProps.item" alt="car" />
                </template>
            </Galleria>
        </div>
        <TabView>
            <TabPanel header="Equipamento">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-5">
                    <div class="w-full flex gap-8">
                        <p class="font-Barlow font-medium text-lg text-brand-black">Anunciante :</p>
                        <p class="font-Barlow font-bold text-lg text-brand-black">Profissional</p>
                    </div>
                    <div class="w-full flex gap-8">
                        <p class="font-Barlow font-medium text-lg text-brand-black">Anunciante :</p>
                        <p class="font-Barlow font-bold text-lg text-brand-black">Profissional</p>
                    </div>
                    <div class="w-full flex gap-8">
                        <p class="font-Barlow font-medium text-lg text-brand-black">Anunciante :</p>
                        <p class="font-Barlow font-bold text-lg text-brand-black">Profissional</p>
                    </div>
                </div>
            </TabPanel>
            <TabPanel header="Detalhes">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-5">
                    <div class="w-full flex gap-8">
                        <p class="font-Barlow font-medium text-lg text-brand-black">Anunciante :</p>
                        <p class="font-Barlow font-bold text-lg text-brand-black">Profissional1</p>
                    </div>
                    <div class="w-full flex gap-8">
                        <p class="font-Barlow font-medium text-lg text-brand-black">Anunciante :</p>
                        <p class="font-Barlow font-bold text-lg text-brand-black">Profissional1</p>
                    </div>
                    <div class="w-full flex gap-8">
                        <p class="font-Barlow font-medium text-lg text-brand-black">Anunciante :</p>
                        <p class="font-Barlow font-bold text-lg text-brand-black">Profissional1</p>
                    </div>
                    <div class="w-full flex gap-8">
                        <p class="font-Barlow font-medium text-lg text-brand-black">Anunciante :</p>
                        <p class="font-Barlow font-bold text-lg text-brand-black">Profissional1</p>
                    </div>
                    <div class="w-full flex gap-8">
                        <p class="font-Barlow font-medium text-lg text-brand-black">Anunciante :</p>
                        <p class="font-Barlow font-bold text-lg text-brand-black">Profissional1</p>
                    </div>
                    <div class="w-full flex gap-8">
                        <p class="font-Barlow font-medium text-lg text-brand-black">Anunciante :</p>
                        <p class="font-Barlow font-bold text-lg text-brand-black">Profissional1</p>
                    </div>
                </div>
            </TabPanel>
        </TabView>
    </section>
</template>