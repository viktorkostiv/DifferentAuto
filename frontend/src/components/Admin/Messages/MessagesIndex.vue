<script>
import Image from 'primevue/image';
export default {
    components: {
        Image
    },
    data() {
        return {
            inputValue: null
        }
    }
}
</script>

<template>
    <section class="flex flex-col gap-8">
        <div class="w-fit">
            <h2 class="font-Barlow font-bold text-brand-black text-3xl md:text-4xl uppercase">mensagens</h2>
            <div class="w-1/3 h-1 bg-brand-orange"></div>
        </div>

        <div class="flex flex-col gap-3">
            <div
                class="w-full grid grid-cols-[180px_280px_1fr_120px] bg-brand-gray border-b-2 border-brand-orange rounded-md ">
                <p class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    Data</p>
                <p class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    Email</p>
                <p class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    MENSAGEN</p>
                <p class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    Ações</p>
            </div>

            <div class="flex flex-col gap-2">
                <div
                    class="w-full grid grid-cols-[180px_280px_1fr_120px] bg-white rounded-md shadow-xl items-center border-t-2 border-brand-gray-light/50">
                    <p class="font-Barlow font-medium text-lg text-brand-black py-2 px-4">12 May 2024</p>
                    <p class="font-Barlow font-medium text-lg text-brand-black py-2 px-4">viktorkostiv2001@gmail.com</p>
                    <p class="font-Barlow font-medium text-lg text-brand-black py-2 px-4">Citroën Picasso C4 Grand Picasso - 09</p>
                    <a href="/admin/cars/id" class="py-2 px-4 w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            class="w-7 h-7 fill-brand-black duration-300 ease-linear hover:scale-105 hover:fill-brand-orange">
                            <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                            <path fill-rule="evenodd"
                                d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                                clip-rule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>