<template>
    <div class="card flex-row glass overflow-hidden">
        <div class="card-info w-2/5 text-sm text-gray-700 p-10" style="background-color: var(--color-primary)">
            <h2 class="text-2xl text-black mb-4">Contact information</h2>
            <p class="mb-4">We'd love to hear from you!</p>
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
        <div class="card-body w-3/5 text-end">
            <h2 class="text-2xl text-center text-black mb-4">Send us a message</h2>
            <div v-if="successMessage" class="mb-4 text-green-500">{{ successMessage }}</div>
            <div v-if="errorMessage" class="mb-4 text-red-500">{{ errorMessage }}</div>
            <form @submit.prevent="submitForm" ref="contactForm">
                <div class="flex">
                    <div class="w-1/2 mr-3">
                        <div class="mb-4">
                            <label class="block text-red-500 text-lg font-bold mb-2" for="firstName">*</label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                                id="firstName" v-model="formData.firsName" type="text" placeholder="Your first name">
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

<script>
export default {
    name: 'ContactInfoComponent',
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
            successMessage: '',
            errorMessage: ''

        };
    },
    methods: {
        async submitForm() {
            try {
                // Verzend de formuliergegevens naar de API
                const response = await fetch('https://localhost:44333/api/Mail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.formData) // Stuur de formData rechtstreeks naar de API als JSON
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(`Failed to submit form: ${errorMessage}`);
                }


                this.successMessage = 'Form submitted successfully'; // Stel het succesbericht in

                // Verberg het succesbericht na 3 seconden
                setTimeout(() => {
                    this.successMessage = '';
                }, 3000);
                // Reset het formulier na een succesvolle verzending
                this.$refs.contactForm.reset();
            } catch (error) {
                // Handel eventuele fouten af bij het verzenden van het formulier
                console.error('Error submitting form:', error);
                this.errorMessage = 'Form unsuccesfull'; // Stel het succesbericht in
                setTimeout(() => {
                    this.errorMessage = '';
                }, 3000);
            }
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
