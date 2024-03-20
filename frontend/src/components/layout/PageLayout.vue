<script>
import TheHeader from './TheHeader.vue';
import TheFooter from './TheFooter.vue';

export default {
    components: {
        TheHeader,
        TheFooter
    }
}
</script>

<template>
    <TheHeader/>
    <main>
        <slot></slot>
    </main>
    <TheFooter/>
</template>