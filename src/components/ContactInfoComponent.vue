<template>
    <div class="card flex-col md:flex-row overflow-hidden shadow-2xl rounded">
        <div class="card-info w-full md:w-2/5 text-sm text-gray-700 p-10" style="background-color: var(--color-primary)">
            <h2 class="text-2xl text-black mb-4">
                {{ $t("contact_info_component.contact_info") }}
            </h2>
            <p class="mb-4">
                {{ $t("contact_info_component.contact_info_desc") }}
            </p>
            <p class="mb-4">
                <FontAwesomeIcon icon="fa-envelope" class="mr-2" />
                <a href="mailto:a.van.vulpen@windesheim.nl">a.van.vulpen@windesheim.nl</a>
            </p>
            <p class="mb-4">
                <FontAwesomeIcon icon="fa-phone" class="mr-2" />
                <a href="callto:+31612345678">+31 6 12345678</a>
            </p>
            <p class="mb-4">
                <FontAwesomeIcon icon="fa-map-marker-alt" class="mr-2" />
                123 Main St, Deventer, NL
            </p>
        </div>
        <div class="card-body w-full md:w-3/5 bg-white">
            <h2 class="text-2xl text-center text-black mb-4">
                {{ $t("contact_info_component.send_us_a_message") }}
            </h2>
            <div ref="contactForm">
                <div class="flex flex-col md:flex-row">
                    <div class="w-full md:w-1/2 mr-3">
                        <div class="mb-4">
                            <label class="block text-gray-500 text-lg font-bold mb-2" for="firstName">
                                {{ $t("fields.first_name") }}
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                                id="firstName" v-model="formData.firsName" type="text" :placeholder="$t('fields.your_first_name')">
                        </div>
                    </div>
                    <div class="w-full md:w-1/2">
                        <div class="mb-4">
                            <label class="block text-gray-500 text-lg font-bold mb-2" for="lastName">
                                {{ $t("fields.last_name") }}
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                                id="lastName" v-model="formData.lastName" type="text" :placeholder="$t('fields.your_last_name')">
                        </div>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row">
                    <div class="w-full md:w-1/2 mr-3">
                        <div class="mb-4">
                            <label class="block text-gray-500 text-lg font-bold mb-2" for="email">
                                {{ $t("fields.email") }}
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                                id="email" v-model="formData.email" type="email" :placeholder="$t('fields.your_email')">
                        </div>
                    </div>
                    <div class="w-full md:w-1/2">
                        <div class="mb-4">
                            <div class="flex justify-between items-center flex-wrap">
                                <label class="text-gray-500 text-lg font-bold mb-2" for="message">
                                    {{ $t("fields.phone_number") }}
                                </label>
                                <label class="text-end text-gray-500 font-bold text-sm mb-2" for="phone">
                                    {{ $t("utils.optional") }}
                                </label>
                            </div>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                                id="phone" v-model="formData.phone" type="tel" :placeholder="$t('fields.your_phone_number')">
                        </div>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-500 text-lg font-bold mb-2" for="subject">
                        {{ $t("fields.subject") }}
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        id="subject" v-model="formData.subject" type="text" :placeholder="$t('fields.your_subject')">
                </div>
                <div class="mb-4">
                    <div class="flex justify-between items-center flex-wrap">
                        <label class="text-gray-500 text-lg font-bold mb-2" for="message">
                            {{ $t("fields.message") }}
                        </label>
                        <label class="text-end text-gray-500 font-bold text-sm mb-2" for="phone">
                            {{ $t("utils.optional") }}
                        </label>
                    </div>
                    <textarea
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        id="message" v-model="formData.message" :placeholder="$t('fields.your_message')"></textarea>
                </div>
                <div class="flex items-center justify-end">
                    <PrimaryButton
                        :label="$t('utils.send')"
                        @onClick="submit"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import PopupHelper from "@/helpers/PopupHelper.js";
import i18n from '../i18n/index.js';
import axios from "axios";

export default {
    name: 'ContactInfoComponent',
    components: {
        PrimaryButton,
    },
    data() {
        return {
            formData: {
                firsName: '',
                lastName: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            },
        };
    },
    methods: {
        cleanForm() {
            this.formData = {
                firsName: '',
                lastName: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            };
        },
        submit() {
            if (
                !this.formData.firsName ||
                !this.formData.lastName ||
                !this.formData.email ||
                !this.formData.subject
            ) {
                PopupHelper.DisplayErrorPopup(i18n.global.t('errors.missing_fields'));

                return;
            }

            axios.post('/api/Mail', {
                ...this.formData
            }).then(() => {
                PopupHelper.DisplaySuccessPopup(i18n.global.t('success.mail_sent'));
            }).catch(() => {
                PopupHelper.DisplayErrorPopup(i18n.global.t('errors.mail_not_sent'));
            }).finally(() => {
                this.cleanForm();
            });
        }
    }
};
</script>

<style scoped>
    .card-body label {
        line-height: 1rem;
    }

    .submit-button {
        transition: all 0.3s ease;
        background-color: var(--button-primary);
        color: var(--button-primary-text);
    }
    .submit-button:hover {
        background-color: var(--button-primary-hover);
    }

    @media(max-width: 768px) {
        .card {
            flex-direction: column;
        }

        .card-info,
        .card-body {
            width: 100%;
        }

        #firstName,
        #lastName,
        #email,
        #phone,
        #subject,
        #message,
        .submit-button {
            font-size: small;
        }
    }
</style>
