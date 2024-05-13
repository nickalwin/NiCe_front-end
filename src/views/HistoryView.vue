<template>
    <div class="flex flex-col items-center justify-center mt-32 px-4 sm:px-0">
        <div class="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center space-x-4 w-full max-w-2xl">
            <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-indigo-600">
                {{ $t('history_page.last_codes') }}:
            </h2>
            <template v-if="editableScanCode && readonlyScanCode">
                <div class="w-full">
                    <label class="block text-lg sm:text-xl font-medium text-gray-700">
                        {{ $t('history_page.editable') }}:
                    </label>
                    <div class="flex flex-col sm:flex-row items-center mt-2">
                        <div
                            class="flex-grow mr-2 py-2 px-3 text-lg sm:text-xl border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-2 sm:mb-0 overflow-auto"
                        >
                            {{ editableScanCode }}
                        </div>
                        <PrimaryButton
                            @onClick="copyToClipboard(editableScanCode)"
                            :label="$t('utils.copy')" />
                    </div>
                </div>
                <div class="w-full mt-4">
                    <label class="block text-lg sm:text-xl font-medium text-gray-700">
                        {{ $t('history_page.read_only') }}:
                    </label>
                    <div class="flex flex-col sm:flex-row items-center mt-2">
                        <div
                            class="flex-grow mr-2 py-2 px-3 text-lg sm:text-xl border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-2 sm:mb-0 overflow-auto"
                        >
                            {{ readonlyScanCode }}
                        </div>
                        <PrimaryButton
                            @onClick="copyToClipboard(readonlyScanCode)"
                            :label="$t('utils.copy')" />
                    </div>
                </div>
            </template>
            <template v-else>
                <p class="text-lg sm:text-xl text-gray-500">
                    {{ $t('history_page.no_scans') }}.
                </p>
            </template>
        </div>
    </div>
</template>

<script>
import LocalStorage from '@/helpers/LocalStorage';
import PopupHelper from "@/helpers/PopupHelper.js";
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';

export default {
    components: {
        PrimaryButton
    },
    data() {
        return {
            editableScanCode: null,
            readonlyScanCode: null
        }
    },
    methods: {
        copyToClipboard(text) {
            navigator.clipboard.writeText(text);

            PopupHelper.DisplaySuccessPopup(this.$t('utils.copied_to_clipboard'));
        }
    },
    mounted() {
        document.documentElement.setAttribute("data-theme", "goud");

        let codes = LocalStorage.TryGetLastCodes();

        if (codes) {
            this.editableScanCode = codes.editable;
            this.readonlyScanCode = codes.readonly;
        }
    }
};
</script>
