<template>
    <div class="card flex-row glass overflow-hidden">
        <div class="card-info w-2/5 text-sm text-gray-700 p-10" style="background-color: var(--color-primary)">
            <h2 class="text-2xl text-black mb-4">Contact information</h2>
            <p class="mb-4">We'd love to hear from you!</p>
            <p class="mb-4">
                <a href="mailto:a.van.vulpen@windesheim.nl">a.van.vulpen@windesheim.nl</a>
            </p>
            <p class="mb-4">
                <a href="callto:+31612345678">+31 6 12345678</a>
            </p>
            <p class="mb-4">
                123 Main St, Deventer, NL
            </p>
        </div>
        <div class="card-body w-3/5 text-end">
            <h2 class="text-2xl text-center text-black mb-4">Send us a message</h2>
            <form @submit.prevent="submitForm" ref="contactForm">
                <div class="flex">
                    <div class="w-1/2 mr-3">
                        <div class="mb-4">
                            <label class="block text-red-500 text-lg font-bold mb-2" for="firstName">*</label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                                id="firstName" v-model="formData.firstName" type="text" placeholder="Your first name">
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="mb-4">
                            <label class="block text-red-500 text-lg font-bold mb-2" for="lastName">*</label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                                id="lastName" v-model="formData.lastName" type="text" placeholder="Your last name">
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="w-1/2 mr-3">
                        <div class="mb-4">
                            <label class="block text-red-500 text-lg font-bold mb-2" for="email">*</label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                                id="email" v-model="formData.email" type="email" placeholder="Your email">
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="mb-4">
                            <label class="block text-end text-gray-500 text-xs mb-2" for="phone">optional</label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                                id="phone" v-model="formData.phone" type="tel" placeholder="Your phonenumber">
                        </div>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-red-500 text-lg font-bold mb-2" for="subject">*</label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                                id="subject" v-model="formData.subject" type="text" placeholder="Subject">
                        </div>
                <div class="mb-4">
                    <label class="block text-gray-500 text-xs mb-2" for="message">Max. 500 characters</label>
                    <textarea
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        id="message" v-model="formData.message" placeholder="Your message"></textarea>
                </div>
                <div class="flex items-center justify-end">
                    <button
                        class="submit-button bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Send
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style>
/* homepage */
.card-body label {
    line-height: 1rem;
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
    
<script>
import { fas } from '@fortawesome/free-solid-svg-icons';

export default {
    name: 'ContactInfoComponent',
    data() {
        return {
            formData: {
            }
        }
    },
    methods: {
        async submitForm() {
            // Add your form submission logic here
            console.log('Form submitted:', this.formData);

            // Reset the form
            this.$refs.contactForm.reset();
        }
    }
}
</script>