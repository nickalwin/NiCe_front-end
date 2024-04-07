<template>
    <div class="flex flex-col items-center justify-center mt-32 px-4 sm:px-0">
        <div class="p-6 bg-white rounded-xl shadow-md flex flex-col items-center space-x-4 w-full max-w-2xl">
            <h2 class="text-lg sm:text-2xl font-semibold mb-4">
                {{ $t('history_page.last_codes') }}:
            </h2>
            <template v-if="editableScanCode && readonlyScanCode">
                <div class="w-full">
                    <label class="block text-base sm:text-lg font-medium text-gray-700">
                        {{ $t('history_page.editable') }}:
                    </label>
                    <div class="flex flex-col sm:flex-row items-center mt-2">
                        <div
                            class="flex-grow mr-2 py-2 px-3 text-base sm:text-lg border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-2 sm:mb-0 overflow-auto"
                        >
                            {{ editableScanCode }}
                        </div>
                        <button class="py-2 px-4 bg-indigo-500 text-white rounded-md"
                            @click="copyToClipboard(editableScanCode)">
                            {{ $t('utils.copy') }}
                        </button>
                    </div>
                </div>
                <div class="w-full mt-4">
                    <label class="block text-base sm:text-lg font-medium text-gray-700">
                        {{ $t('history_page.read_only') }}:
                    </label>
                    <div class="flex flex-col sm:flex-row items-center mt-2">
                        <div
                            class="flex-grow mr-2 py-2 px-3 text-base sm:text-lg border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-2 sm:mb-0 overflow-auto"
                        >
                            {{ readonlyScanCode }}
                        </div>
                        <button class="py-2 px-4 bg-indigo-500 text-white rounded-md"
                            @click="copyToClipboard(readonlyScanCode)">
                            {{ $t('utils.copy') }}
                        </button>
                    </div>
                </div>
            </template>
            <template v-else>
                <p class="text-base sm:text-lg text-gray-500">
                    {{ $t('history_page.no_scans') }}.
                </p>
            </template>
        </div>
    </div>
</template>

<script>
import LocalStorage from '@/helpers/LocalStorage';
import PopupHelper from "@/helpers/PopupHelper.js";

export default {
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
        let codes = LocalStorage.TryGetLastCodes();

        if (codes) {
            this.editableScanCode = codes.editable;
            this.readonlyScanCode = codes.readonly;
        }
    }
};
</script>
