<script>
import SpeedDial from 'primevue/speeddial';

import TheHeader from './TheHeader.vue';
import TheFooter from './TheFooter.vue';

export default {
    components: {
        SpeedDial,
        TheHeader,
        TheFooter
    },
    data() {
        return {
            items: [
                {
                    label: 'Home',
                    icon: 'pi pi-home',
                    command: () => {
                        this.$router.push('/');
                    }
                },
                {
                    label: 'Cars',
                    icon: 'pi pi-car',
                    command: () => {
                        this.$router.push('/cars');
                    }
                },
            ]
        }
    }
}
</script>

<template>
    <div class="min-h-screen flex flex-col justify-between">
        <div class="fixed z-[9999] w-[40px] h-[40px] right-3 top-[80vh] md:hidden">
            <SpeedDial :model="items" direction="up" :style="{ left: 0, top: 0 }" />
        </div>
        <TheHeader />
        <main class="h-full">
            <slot></slot>
        </main>
        <TheFooter />
    </div>

</template>