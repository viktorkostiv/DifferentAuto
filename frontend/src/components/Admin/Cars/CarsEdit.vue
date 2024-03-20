<script>
import Galleria from 'primevue/galleria';
import Image from 'primevue/image';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputNumber from 'primevue/inputnumber';
import FileUpload from 'primevue/fileupload';

export default {
    components: {
        Galleria,
        Image,
        TabView,
        TabPanel,
        InputText,
        InputGroup,
        InputGroupAddon,
        InputNumber,
        FileUpload
    },
    data() {
        return {

        }
    }
}
</script>

<template>
    <section class="flex flex-col gap-12">
        <div class="flex justify-between">
            <div class="flex gap-4">
                <router-link to="/admin/cars" class="base-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd"
                            d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                            clip-rule="evenodd" />
                    </svg>
                </router-link>
                <div class="w-fit">
                    <h2 class="font-Barlow font-bold text-brand-black text-2xl uppercase">Editar Carro</h2>
                    <div class="w-1/3 h-1 bg-brand-orange"></div>
                    <p class="font-Barlow font-semibold text-xl text-brand-gray mt-2">ID: 0SQMYWCR8C9IKU9AGNK4</p>
                </div>
            </div>

            <div class="flex gap-4">
                <button class="base-button gap-2 after:from-brand-green after:to-brand-green/80">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd"
                            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                            clip-rule="evenodd" />
                    </svg>
                    Salvar
                </button>
                <button class="base-button gap-2 after:from-brand-red after:to-brand-red/80">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd"
                            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                            clip-rule="evenodd" />
                    </svg>
                    Cancelar
                </button>
            </div>
        </div>

        <div class="flex flex-col gap-4 admin-form">
            <div class="flex w-full gap-6 items-center">
                <div class="w-full">
                    <div class="w-fit mb-4">
                        <h3 class="font-Barlow font-bold text-xl text-brand-black uppercase">Carro</h3>
                        <div class="w-1/2 h-1 bg-brand-orange"></div>
                    </div>
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-car text-brand-gray/50"></i>
                        </InputGroupAddon>
                        <InputText id="car" />
                    </InputGroup>
                </div>
                <div class="w-full max-w-[280px]">
                    <div class="w-fit mb-4">
                        <h3 class="font-Barlow font-bold text-xl text-brand-black uppercase">Preço</h3>
                        <div class="w-1/2 h-1 bg-brand-orange"></div>
                    </div>
                    <InputGroup>
                        <InputGroupAddon>
                            <p class="font-Barlow font-medium text-lg text-brand-gray/50 leading-3">€</p>
                        </InputGroupAddon>
                        <InputNumber id="price" />
                    </InputGroup>
                </div>
            </div>
            <div class="mt-6">
                <div class="flex justify-between">
                    <div class="w-fit">
                        <h3 class="font-Barlow font-bold text-xl text-brand-black uppercase">Detalhes</h3>
                        <div class="w-1/2 h-1 bg-brand-orange"></div>
                    </div>

                    <button class="base-button gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                                clip-rule="evenodd" />
                        </svg>
                        Adicionar
                    </button>
                </div>

                <div class="grid grid-cols-2 gap-5 mt-4">
                    <InputGroup>
                        <InputGroupAddon>
                            <p class="font-Barlow font-semibold text-lg text-brand-gray/80 leading-3 px-6">Combustível
                            </p>
                        </InputGroupAddon>
                        <InputText id="price" />
                    </InputGroup>

                    <InputGroup>
                        <InputGroupAddon>
                            <p class="font-Barlow font-semibold text-lg text-brand-gray/80 leading-3 px-6">Cor
                            </p>
                        </InputGroupAddon>
                        <InputText id="price" />
                    </InputGroup>

                    <InputGroup>
                        <InputGroupAddon>
                            <p class="font-Barlow font-semibold text-lg text-brand-gray/80 leading-3 px-6">Deslocamento
                            </p>
                        </InputGroupAddon>
                        <InputText id="price" />
                    </InputGroup>
                </div>
            </div>

            <div class="mt-6">
                <div class="flex justify-between">
                    <div class="w-fit">
                        <h3 class="font-Barlow font-bold text-xl text-brand-black uppercase">equipamento</h3>
                        <div class="w-1/2 h-1 bg-brand-orange"></div>
                    </div>

                    <button class="base-button gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                                clip-rule="evenodd" />
                        </svg>
                        Adicionar
                    </button>
                </div>

                <div class="grid grid-cols-2 gap-5 mt-4">
                    <InputText id="price" class="!rounded-md" />
                </div>
            </div>

            <div class="mt-6">
                <div class="flex justify-between">
                    <div class="w-fit">
                        <h3 class="font-Barlow font-bold text-xl text-brand-black uppercase">adicional</h3>
                        <div class="w-1/2 h-1 bg-brand-orange"></div>
                    </div>

                    <button class="base-button gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                                clip-rule="evenodd" />
                        </svg>
                        Adicionar
                    </button>
                </div>

                <div class="grid grid-cols-2 gap-5 mt-4">
                    <InputText id="price" class="!rounded-md" />
                </div>
            </div>

            <div class="mt-6">
                <div class="w-fit mb-4">
                    <h3 class="font-Barlow font-bold text-xl text-brand-black uppercase">imagens</h3>
                    <div class="w-1/2 h-1 bg-brand-orange"></div>
                </div>

                <FileUpload name="files" :url="``" @upload="" :multiple="true" accept="image/*" :maxFileSize="5000000">
                    <template #empty>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-32 h-32 stroke-brand-gray-light">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                        </svg>


                        <p class="font-Montserrat font-medium text-base text-brand-gray-light text-center px-4">
                            Drag and drop files
                            to here to upload.</p>
                    </template>
                </FileUpload>
            </div>
        </div>
    </section>
</template>