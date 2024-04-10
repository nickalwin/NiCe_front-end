<template>
    <dialog id="ScanInfoModal" class="modal rounded-lg shadow-lg overflow-hidden">
        <div class="modal-box p-6">
            <LoadingTemplate :isLoading="isLoading" :center="true">
                <h1 class="text-2xl font-bold mb-4">Fill the info before scan</h1>

                <SingleRow>
                    <CasualInput v-model="name"
                        :label="$t('fields.name')"
                        :placeholder="$t('fields.your_name')"
                    >
                        <template #beforeValue>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                        </template>
                        <template #errors>
                            <span v-for="(error, index) in v$.name.$errors" :key="index" class="text-red-500 text-xs">
                                <p>{{  $t(`validation.${v$.name.$errors[index].$validator}`) }}</p>
                            </span>
                        </template>
                    </CasualInput>
                </SingleRow>

                <SingleRow>
                    <CasualInput v-model="email"
                        :label="$t('fields.email')"
                        :placeholder="$t('fields.your_email')"
                    >
                        <template #beforeValue>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        </template>
                        <template #errors>
                            <span v-for="(error, index) in v$.email.$errors" :key="index" class="text-red-500 text-xs">
                                <p>{{  $t(`validation.${v$.email.$errors[index].$validator}`) }}</p>
                            </span>
                        </template>
                    </CasualInput>
                </SingleRow>

                <DoubleRow>
                    <template #first>
                        <span class="label-text">
                            <FontAwesomeIcon icon="fa-asterisk" style="color: gray" />

                            I agree to the

                            <a href="#" class="text-blue-500 underline">terms and conditions</a>
                        </span>
                    </template>

                    <template #second>
                        <input id="agreed" v-model="rulesAccepted" type="checkbox" class="checkbox" />
                    </template>
                </DoubleRow>

                <cite class="text-sm">
                    <FontAwesomeIcon icon="fa-asterisk" style="color: gray" /> Required fields
                </cite>

                <DoubleRow>
                    <template #first>
                        <SecondaryButton
                            :label="$t('utils.cancel')"
                            @onClick="close"
                        />
                    </template>

                    <template #second>
                        <PrimaryButton
                            :label="$t('utils.continue')"
                            :disabled="!rulesAccepted"
                            @onClick="continueToScan"
                        />
                    </template>
                </DoubleRow>
            </LoadingTemplate>
        </div>
    </dialog>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import SecondaryButton from '@/components/buttons/SecondaryButton.vue';
import SingleRow from '@/components/layouts/SingleRow.vue';
import DoubleRow from '@/components/layouts/DoubleRow.vue';
import LoadingTemplate from "@/components/utils/LoadingTemplate.vue";
import CasualInput from '@/components/inputs/CasualInput.vue';

export default {
    name: "ScanInfoModal",
    components: {
        PrimaryButton, DoubleRow, SingleRow, SecondaryButton, LoadingTemplate, CasualInput,
    },
    setup () {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            name: '',
            email: '',
            sector: '',
            sectors: [],
            rulesAccepted: false,
            isLoading: false,
        }
    },
    validations () {
        return {
            name: { required },
            email: { required, email }
        }
    },
    methods: {
        open() {
            const modal = document.getElementById("ScanInfoModal");

            modal.showModal();
        },
        close() {
            const modal = document.getElementById("ScanInfoModal");

            modal.close();
        },
        reset() {
            this.rulesAccepted = false;
        },
        loadSectorsFromAPI() {
            if (this.sectors.length)
                return;

            this.isLoading = true;

            axios.get('/api/sectors', {

            }).then((response) => {
                let sectors = response.data;

                sectors.forEach((sector) => {
                    this.sectors.push({
                        id: sector.id,
                        data: JSON.parse(sector.data),
                    });
                });

                this.isLoading = false;
            }).catch((error) => {
                PopupHelper.DisplayErrorPopup(error.response.data.message);
            })
        },
        getTranslatedSectorName(sector) {
            return sector.data[this.$i18n.locale] ?
                    sector.data[this.$i18n.locale].name :
                    sector.data['nl'].name;
        },
        async continueToScan() {
            const result = await this.v$.$validate();
            console.log(result);
        }
    },
    mounted() {
        this.reset();

        this.loadSectorsFromAPI();
    }
}
</script>
<!-- //     LocalStorage.SetContactInfo({
//         name: Result[0],
//         email: Result[1],
//         sector: sector,
//     }); -->
