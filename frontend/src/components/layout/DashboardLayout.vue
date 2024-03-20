<script>
export default {
    data() {
        return {
            admin: null,

            activePage: null,

            menuOpened: false,
            navOpened: false,

            newMessages: 0,
        }
    },
    methods: {

        getActivePage() {
            const currentPathname = this.$route.path;
            const pathSegments = currentPathname.split('/');
            this.activePage = pathSegments[2];
        },

        toggleMenu() {
            this.menuOpened = !this.menuOpened;

            localStorage.setItem('menuOpened', JSON.stringify(this.menuOpened));
            if (this.menuOpened) {
                setTimeout(() => {
                    this.navOpened = this.menuOpened;
                }, 300)
            } else this.navOpened = this.menuOpened;
        },

    },
    watch: {
        $route(to, from) {
            this.getActivePage();
        },
    },
    async mounted() {

        this.getActivePage();

        const menuOpened = localStorage.getItem('menuOpened');
        if (menuOpened !== null) {
            this.menuOpened = JSON.parse(menuOpened);
            this.navOpened = this.menuOpened;
        }
    },
}
</script>

<template>
    <div class="relative w-full bg-brand-gray-light min-h-screen">
        <div ref="header" class="absolute w-full top-0 left-0 p-[10px] md:p-4 z-[5]">
            <div
                class="w-full bg-white rounded-md p-3 md:px-5 md:py-4 shadow-sm flex justify-between items-center">
                <router-link to="/">
                    <img src="../../assets/images/logo.png" alt="logo" class="w-[160px]">
                </router-link>

                <button class="base-button items-center gap-2">
                    Logout
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 rotate-180">
                        <path fill-rule="evenodd"
                            d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z"
                            clip-rule="evenodd" />
                        <path fill-rule="evenodd"
                            d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z"
                            clip-rule="evenodd" />
                    </svg>

                </button>
            </div>
        </div>
        <div class="flex min-h-screen relative">
            <nav class="bg-brand-gray h-full xl:h-auto w-full duration-300 ease-linear top-0 left-0 absolute xl:relative z-[4] shadow-xl rounded-r-md"
                :class="{ 'min-w-[268px] max-w-[268px]': menuOpened, 'min-w-[20px] max-w-[20px] md:min-w-[54px] md:max-w-[54px]': !menuOpened }">

                <div class="w-full h-screen fixed top-0 left-0 pt-[60px] xl:pt-[154px] flex flex-col gap-2 justify-center xl:justify-between duration-300 ease-linear"
                    :class="{ 'max-w-[268px] px-6 pb-8': menuOpened, 'min-w-[20px] max-w-[20px] md:min-w-[54px] md:max-w-[54px]': !menuOpened }">

                    <button @click.prevent="toggleMenu()"
                        class="top-1/2 -translate-y-1/2 -right-[22px] border-[4px] border-brand-gray flex gap-2 mb-2 bg-white w-10 h-10 group absolute rounded-full duration-300 ease-linear hover:scale-105 hover:border-brand-orange shadow-lg">
                        <svg v-if="menuOpened" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="3" stroke="currentColor"
                            class="w-5 h-5 opacity-0 stroke-brand-gray absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 ease-linear group-hover:opacity-100">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="3" stroke="currentColor"
                            class="w-5 h-5 opacity-0 stroke-brand-gray absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 ease-linear group-hover:opacity-100">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6 stroke-brand-gray absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 ease-linear group-hover:opacity-0">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>

                    <div class="flex flex-col gap-2" v-if="navOpened">
                        <router-link to="/admin/cars"
                            :class="{ '!text-brand-gray !bg-white border-b-2 border-brand-orange': activePage === 'cars' }"
                            class="w-[220px] h-[52px] relative flex justify-between items-center px-5 font-Barlow font-bold text-base text-white rounded-md group duration-300 ease-linear hover:text-brand-gray hover:bg-white">
                            Carros
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                :class="{ '!fill-brand-gray': activePage === 'cars' }"
                                class="w-5 h-5 fill-white duration-300 ease-linear group-hover:fill-brand-gray">
                                <path fill-rule="evenodd"
                                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </router-link>

                        <router-link to="/admin/messages"
                            :class="{ '!text-brand-gray !bg-white border-b-2 border-brand-orange': activePage === 'messages' }"
                            class="w-[220px] h-[52px] relative flex justify-between items-center px-5 font-Barlow font-bold text-base text-white rounded-md group duration-300 ease-linear hover:text-brand-gray hover:bg-white">
                            <p v-if="newMessages > 0"
                                class="absolute top-1/2 -translate-y-1/2 left-[-10px] w-6 h-6 bg-orange-600 rounded-full font-Barlow font-bold text-xs text-white flex items-center justify-center">
                                {{ newMessages }}
                            </p>
                            Mensagens
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                :class="{ '!fill-brand-gray': activePage === 'messages' }"
                                class="w-5 h-5 fill-white duration-300 ease-linear group-hover:fill-brand-gray">
                                <path fill-rule="evenodd"
                                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </router-link>




                    </div>
                </div>
            </nav>

            <main class="pt-20 pl-8 md:pt-32 md:pl-20 pr-3 md:pr-5 xl:px-5 pb-8 w-full max-w-[1440px] mx-auto">
                <div class="w-full bg-white rounded-md shadow-sm p-3 md:p-5">
                    <slot></slot>

                </div>
            </main>
        </div>
    </div>
</template>