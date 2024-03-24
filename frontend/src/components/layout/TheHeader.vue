<script>
import { useUtilsStore } from '../../stores/utils';
export default {
    setup() {
        const utilsStore = useUtilsStore();

        return {
            utilsStore
        };
    },
}
</script>

<template>
    <header class="w-full border-t-4 border-brand-orange relative z-[2]">
        <div class="w-full bg-brand-gray py-1.5">
            <div class="max-w-[1220px] w-full mx-auto px-4 flex justify-between">
                <a :href="`tel:${utilsStore.phoneNumber}`" class="flex items-center gap-2 font-Barlow font-medium text-sm text-white group duration-300 ease-linear hover:text-brand-orange">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        class="w-4 h-4 fill-white duration-300 ease-linear group-hover:scale-125 group-hover:fill-brand-orange">
                        <path fill-rule="evenodd"
                            d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
                            clip-rule="evenodd" />
                    </svg>

                    {{ utilsStore.phoneNumber }}
                </a>
                <a :href="utilsStore.addressLink" target="_blank" class="flex items-center gap-2 font-Barlow font-medium text-[0px] sm:text-sm text-white group duration-300 ease-linear hover:text-brand-orange">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        class="w-4 h-4 fill-white duration-300 ease-linear group-hover:scale-125 group-hover:fill-brand-orange">
                        <path fill-rule="evenodd"
                            d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                            clip-rule="evenodd" />
                    </svg>

                    {{ utilsStore.address }}
                </a>
            </div>
        </div>
        <div class="bg-white shadow-2xl">
            <div class="max-w-[1220px] w-full mx-auto px-4 flex items-center justify-between py-2.5">
                <nav class="gap-6 hidden md:flex">
                    <router-link to="/" class="font-Barlow font-semibold text-lg text-brand-black tracking-tight duration-300 ease-linear hover:text-brand-orange">Página Principal</router-link>
                    <router-link to="/cars" class="font-Barlow font-semibold text-lg text-brand-black tracking-tight duration-300 ease-linear hover:text-brand-orange">Carros</router-link>
                    <!-- <router-link to="/" class="font-Barlow font-semibold text-lg text-brand-black tracking-tight duration-300 ease-linear hover:text-brand-orange">Contate-nos</router-link> -->
                </nav>
                <router-link to="/" class="w-fit mx-auto md:mx-0">
                    <img src="../../assets/images/logo.png" alt="logo" class="w-[120px] md:w-[160px] object-contain">
                </router-link>
            </div>
        </div>
    </header>
</template>