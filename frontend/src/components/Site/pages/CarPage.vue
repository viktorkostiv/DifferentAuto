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
    <section class="max-w-[1220px] w-full mx-auto px-4 py-12">
        <div class="flex flex-col lg:flex-row gap-8 justify-between">
            <div class="order-2 lg:order-1">
                <div class="w-fit">
                    <h2 class="font-Barlow font-bold text-brand-black text-2xl md:text-3xl uppercase">Audi A6 Avant 40 TDI S</h2>
                    <div class="w-1/3 h-1 bg-brand-orange"></div>
                </div>
                <p class="font-Barlow font-normal text-xl text-brand-black mt-4">2021 &#x2022; 8 000km &#x2022; Diesel</p>
                <p class="font-Barlow font-medium text-lg text-brand-black/50 mt-12">Valor</p>
                <p class="font-Barlow font-bold text-2xl text-brand-orange mb-8">42 500 $</p>
                <a href=""
                    class="font-Barlow font-medium text-lg text-brand-black/50 underline duration-300 ease-linear hover:text-brand-orange">
                    Calcular o empréstimo
                </a>
                <div class="flex gap-3 mt-12 lg:mt-24">
                    <a href="" class="base-button gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                d="M5.404 14.596A6.5 6.5 0 1 1 16.5 10a1.25 1.25 0 0 1-2.5 0 4 4 0 1 0-.571 2.06A2.75 2.75 0 0 0 18 10a8 8 0 1 0-2.343 5.657.75.75 0 0 0-1.06-1.06 6.5 6.5 0 0 1-9.193 0ZM10 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
                                clip-rule="evenodd" />
                        </svg>

                        E-mail
                    </a>
                    <a href="" class="base-button gap-2">
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
                <Galleria :value="images" :numVisible="4" :responsiveOptions="responsiveOptions">
                    <template #item="slotProps">
                        <Image :src="slotProps.item" alt="car" class="w-full duration-300 ease-linear group" preview />
                    </template>
                    <template #thumbnail="slotProps" v-if="images.length > 1">
                        <img :src="slotProps.item" alt="car" />
                    </template>
                </Galleria>
            </div>
        </div>

        <div class="mt-12">
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
        </div>
    </section>
</template>