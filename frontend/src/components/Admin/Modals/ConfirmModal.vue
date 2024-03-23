<script>
export default {
    props: ['title', 'question'],
    emits: ['confirm_action', 'cancel_action']
}
</script>

<template>
    <section class="fixed top-0 left-0 w-screen h-screen z-[20]">
        <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-brand-gray/30 p-6 rounded-md z-[2]">
            <div class="w-fit mb-4">
                <h3 class="font-Barlow font-bold text-2xl text-brand-black uppercase">{{ title }}</h3>
                <div class="w-1/2 h-1 bg-brand-orange"></div>
            </div>
            <p class="font-Barlow font-normal text-xl text-brand-black/80 mt-4">{{ question }}</p>
            <div class="flex gap-4 mt-8">
                <button @click="$emit('cancel_action')"
                    class="base-button after:from-brand-blue after:to-brand-blue/80">Cancelar</button>
                <button @click="$emit('confirm_action')"
                    class="base-button after:from-brand-red after:to-brand-red/80 gap-2"><svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd"
                            d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                            clip-rule="evenodd" />
                    </svg>
                    Excluir
                </button>
            </div>
        </div>
        <div @click="$emit('cancel_action')" class="w-full h-full bg-brand-black/50 backdrop-blur"></div>
    </section>
</template>