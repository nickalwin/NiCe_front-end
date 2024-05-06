<template>
    <div class="flex flex-col items-center justify-center w-full sm:w-72 m-auto p-5 border border-gray-300 rounded shadow-lg bg-white">
        <canvas ref="captchaCanvas" class="w-48 h-24 mb-4 rounded" width="200" height="100"></canvas>

        <input class="mt-2 p-2 w-full rounded border border-gray-300 shadow-inner" type="text" v-model="userInput" placeholder="Enter Captcha" />

        <PrimaryButton class="mt-2"
            :label="'Check Captcha'"
            @onClick="checkCaptcha"
        />

        <p class="mt-2 text-red-500" v-if="showFeedback">{{ feedback }}</p>
    </div>
</template>

<script>
import PrimaryButton from '../buttons/PrimaryButton.vue';

export default {
    components: {
        PrimaryButton
    },
    emits: ['onSuccess'],
    data() {
        return {
            userInput: '',
            feedback: '',
            showFeedback: false,
            captchaText: ''
        };
    },
    mounted() {
        this.generateCaptcha();
    },
    methods: {
        generateCaptcha() {
            const canvas = this.$refs.captchaCanvas;
            const ctx = canvas.getContext("2d");

            this.captchaText = this.generateRandomCaptchaText();

            ctx.fillStyle = "#FFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = "30px Arial";
            ctx.fillStyle = "#000";

            for (let i = 0; i < this.captchaText.length; i++) {
                const char = this.captchaText[i];
                const x = 20 + i * 30 + Math.random() * 5;
                const y = 50 + Math.random() * 20;
                const rotation = Math.random() * 0.4 - 0.2;
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(rotation);
                ctx.fillText(char, 0, 0);
                ctx.restore();
            }
        },
        generateRandomCaptchaText() {
            const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
            let captchaText = '';
            for (let i = 0; i < 6; i++) {
                captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return captchaText;
        },
        checkCaptcha() {
            if (this.userInput === this.captchaText) {
                this.feedback = 'Captcha correct!';
                this.$emit('onSuccess');
            } else {
                this.feedback = 'Incorrect captcha. Please try again.';
            }

            this.generateCaptcha();
            this.showFeedback = true;
            this.userInput = '';
        }
    }
};
</script>
