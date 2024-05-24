<template>
    <dialog id="ScanInfoModal" class="modal rounded-lg shadow-md overflow-hidden max-w-lg mx-auto">
        <div class="modal-box p-4 sm:p-6 bg-gray-100">
            <LoadingTemplate :isLoading="isLoading" :center="true">
                <h1 class="text-xl sm:text-2xl font-bold mb-4">
                    {{ $t('utils.fill_in_info') }}
                </h1>

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

                <SingleRow>
                    <CasualSelect v-model="sector"
                        :label="$t('fields.sector')"
                        :placeholder="$t('fields.your_sector')"
                        :options="sectors"
                    >
                        <template #beforeValue>
                            <FontAwesomeIcon icon="fa-industry" style="color: gray" size="sm" />
                        </template>
                        <template #errors>
                            <span v-for="(error, index) in v$.sector.$errors" :key="index" class="text-red-500 text-xs">
                                <p>{{  $t(`validation.${v$.sector.$errors[index].$validator}`) }}</p>
                            </span>
                        </template>
                    </CasualSelect>
                </SingleRow>

                <div class="flex flex-col w-full mb-2">
                    <div class="grid h-10 flex-grow card rounded-box place-items-center">
                        <div class="w-3/4 flex flex-row items-center justify-center">
                            <input id="agreed" v-model="rulesAccepted" type="checkbox" />

                            <span class="label-text mr-2 pb-3">
                                <FontAwesomeIcon class="mr-6" icon="fa-asterisk" style="color: red" size="2xs" />
                            </span>

                            <span class="text-sm">
                                {{ $t('utils.i_aggree_to') }} &nbsp;
                            </span>

                            <a href="/terms-and-conditions" class="text-blue-500 underline text-sm">
                                {{ $t('utils.terms_and_conditions') }}
                            </a>
                        </div>
                    </div>
                </div>

                <cite class="text-xs">
                    <FontAwesomeIcon icon="fa-asterisk" style="color: red" size="2xs" class="bl-1 pb-1" /> {{ $t('utils.required_fields') }}
                </cite>

                <DoubleRow>
                    <template #first>
                        <SecondaryButton
                            :label="$t('utils.cancel')"
                            @onClick="cancelOperation"
                        />
                    </template>

                    <template #second>
                        <PrimaryButton
                            :label="$t('utils.continue')"
                            :disabled="!rulesAccepted"
                            @onClick="continueFurther"
                        />
                    </template>
                </DoubleRow>
            </LoadingTemplate>
        </div>
    </dialog>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, email, maxLength } from '@vuelidate/validators';

import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import SecondaryButton from '@/components/buttons/SecondaryButton.vue';
import SingleRow from '@/components/layouts/SingleRow.vue';
import DoubleRow from '@/components/layouts/DoubleRow.vue';
import LoadingTemplate from "@/components/utils/LoadingTemplate.vue";
import CasualInput from '@/components/inputs/CasualInput.vue';
import CasualSelect from '@/components/inputs/CasualSelect.vue';
import PopupHelper from '@/helpers/PopupHelper';
import LocalStorage from "@/helpers/LocalStorage";

export default {
    name: "ScanInfoModal",
    emits: ['onCancel', 'onContinue'],
    components: {
        PrimaryButton, DoubleRow, SingleRow, SecondaryButton, LoadingTemplate, CasualInput,
        CasualSelect,
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
            name: { required, maxLength: maxLength(100) },
            email: { required, email, maxLength: maxLength(100) },
            sector: { required },
        }
    },
    methods: {
        open() {
            this.reset();

            if (!this.sectors.length)
                this.loadSectorsFromAPI();

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
            this.isLoading = true;

            axios.get('/api/sectors', {

            }).then((response) => {
                let sectors = response.data;

                sectors.forEach((sector) => {
                    this.sectors.push({
                        label: this.getTranslatedSectorName(sector),
                        value: sector.id,
                        data: sector.data,
                    });
                });

                this.isLoading = false;
            }).catch((error) => {
                PopupHelper.DisplayErrorPopup(error.response.data.message);
            })
        },
        getTranslatedSectorName(sector) {
            var data = JSON.parse(sector.data);

            return data[this.$i18n.locale] ?
                    data[this.$i18n.locale].name :
                    data['nl'].name;
        },
        cancelOperation() {
            this.$emit('onCancel');
        },
        async continueFurther() {
            const result = await this.v$.$validate();

            if (!result)
                return;

            let sector = this.sectors.find((sector) => sector.value == this.sector);

            LocalStorage.SetContactInfo({
                name: this.name,
                email: this.email,
                sector: sector,
            });

            this.$emit('onContinue');
        }
    }
}
</script>
