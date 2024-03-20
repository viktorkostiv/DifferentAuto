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
        <div class="flex justify-between">
            <div class="w-fit">
                <h2 class="font-Barlow font-bold text-brand-black text-3xl md:text-4xl uppercase">Carros</h2>
                <div class="w-1/3 h-1 bg-brand-orange"></div>
            </div>

            <button class="base-button gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                        clip-rule="evenodd" />
                </svg>
                Adicionar Carro
            </button>
        </div>

        <form @submit.prevent="" class="w-full flex gap-4 items-center">
            <div class="relative w-full">
                <input v-model="inputValue" type="text"
                    class="w-full rounded-md h-[52px] bg-white px-12 py-4 font-Barlow font-medium text-base text-brand-black border-2 border-brand-gray-light placeholder:text-brand-black focus:outline-none focus:border-brand-orange shadow-sm"
                    placeholder="Pesquise por ID ou nome do carro">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    class="w-5 h-5 fill-brand-black absolute top-1/2 -translate-y-1/2 left-4">
                    <path fill-rule="evenodd"
                        d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                        clip-rule="evenodd" />
                </svg>

                <a v-if="inputValue" href="#" @click.prevent="inputValue = null"
                    class="absolute top-1/2 -translate-y-1/2 right-4 duration-300 ease-linear hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        class="w-5 h-5 fill-brand-gray-dark">
                        <path
                            d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                    </svg>
                </a>
            </div>

            <button type="submit" v-if="inputValue"
                class="w-[120px] h-[52px] rounded-md bg-brand-orange block font-Barlow font-semibold text-lg text-white capitalize duration-300 ease-linear hover:grayscale">
                Procurar
            </button>
        </form>

        <div class="flex flex-col gap-3">
            <div
                class="w-full grid grid-cols-[180px_180px_180px_1fr_120px_120px_120px] bg-brand-gray border-b-2 border-brand-orange rounded-md ">
                <p class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    Imagem</p>
                <p class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    Fabricante</p>
                <p class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    Modelo</p>
                <p class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    Carro</p>
                <p class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    Ano</p>
                <p class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    Preço</p>
                <p class="font-Barlow font-medium text-lg text-white border-l border-brand-gray-light/40 py-2 px-4 uppercase">
                    Ações</p>
            </div>

            <div class="flex flex-col gap-2">
                <div
                    class="w-full grid grid-cols-[180px_180px_180px_1fr_120px_120px_120px] bg-white rounded-md shadow-xl items-center border-t-2 border-brand-gray-light/50">
                    <div class="py-2 px-4">
                        <Image
                            src="https://firebasestorage.googleapis.com/v0/b/different-auto.appspot.com/o/0SQMYWCR8C9IKU9AGNK4%2F1-8055024753-citroen-picasso-c4-grand-picasso.jpg?alt=media&token=a3795565-b7eb-434b-93cb-8584f9ef8b44"
                            alt="car" preview class="w-full h-[86px] object-cover rounded-md" />
                    </div>
                    <p class="font-Barlow font-medium text-lg text-brand-black py-2 px-4">Citroën</p>
                    <p class="font-Barlow font-medium text-lg text-brand-black py-2 px-4">Picasso</p>
                    <p class="font-Barlow font-medium text-lg text-brand-black py-2 px-4">Citroën Picasso C4 Grand
                        Picasso - 09</p>
                    <p class="font-Barlow font-medium text-lg text-brand-black py-2 px-4">2009</p>
                    <p class="font-Barlow font-semibold text-lg text-brand-orange py-2 px-4">8 450€</p>
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