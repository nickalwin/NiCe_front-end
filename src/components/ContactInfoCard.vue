<template>
    <div v-if="name && email && selectedSector" class="mt-6 w-3/4 mx-auto flex flex-col md:flex-row justify-between p-5 bg-white shadow-lg rounded-lg">
        <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold first-letter:uppercase text-blue-900">
            {{ name }}
        </h1>
        <div class="flex flex-col md:flex-row m-1 items-center md:items-start">
            <div class="flex flex-wrap items-center bg-gray-100 rounded-lg p-2 mb-2 md:mb-0 md:mr-2 overflow-hidden">
                <FontAwesomeIcon icon="fa-envelope" class="text-blue-900 mr-2"/>
                <span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl truncate max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">{{ email }}</span>
            </div>
            <div class="flex flex-wrap items-center bg-gray-100 rounded-lg p-2 mb-2 md:mb-0 md:mr-2 overflow-hidden">
                <FontAwesomeIcon icon="fa-industry" class="text-blue-900 mr-2"/>
                <span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl truncate max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">{{ getLocalizedSectorName(selectedSector) }}</span>
            </div>
            <span v-on:click="edit" class="hover:text-gray-400 font-bold py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-lg">
                <FontAwesomeIcon icon="fa-edit" />
            </span>
            <span v-on:click="deleteRecords" class="hover:text-gray-400 font-bold py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-lg">
                <FontAwesomeIcon icon="fa-trash" color="red" />
            </span>
        </div>
        <ScanInfoUpdateModal ref="ScanInfoUpdateModal"
            @onCancel="() => { this.$refs.ScanInfoUpdateModal.close(); }"
            @onSave="() => { this.$refs.ScanInfoUpdateModal.close(); this.loadData(); }"
        />
    </div>
</template>

<script>
import LocalStorage from "@/helpers/LocalStorage";
import ScanInfoUpdateModal from "@/components/modals/ScanInfoUpdateModal.vue";
import PopupHelper from "@/helpers/PopupHelper.js";

export default {
    name: "ContactInfoCard",
    components: {
        ScanInfoUpdateModal
    },
    data() {
        return {
            name: null,
            email: null,
            selectedSector: null,
        };
    },
    methods: {
        edit() {
            this.$refs.ScanInfoUpdateModal.open();
        },
        getLocalizedSectorName(sector) {
            var data = JSON.parse(sector.data);

            return data[this.$i18n.locale] ?
                    data[this.$i18n.locale].name :
                    data['nl'].name;
        },
        loadData() {
            let data = LocalStorage.GetContactInfo();

            if (data) {
                this.name = data.name;
                this.email = data.email;
                this.selectedSector = data.sector;
            }
        },
        deleteRecords() {
            PopupHelper.DisplayDangerousDeleteQuestionPopup(() => {
                LocalStorage.ClearScanResults();
                window.location.reload();
            });
        }
    },
    mounted() {
        let data = LocalStorage.GetContactInfo();

        if (data) {
            this.name = data.name;
            this.email = data.email;
            this.selectedSector = data.sector;
        }
    }
};
</script>
