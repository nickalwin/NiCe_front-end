<template>
    <dialog id="CaptchaModal" class="modal overflow-hidden max-w-lg mx-auto">
        <SimpleCaptcha
            @onSuccess="onContinue"
        />
    </dialog>
</template>

<script>
import SimpleCaptcha from "@/components/captcha/SimpleCaptcha.vue";

export default {
    components: {
        SimpleCaptcha
    },
    data() {
        return {

        };
    },
    methods: {
        open() {
            const modal = document.getElementById("CaptchaModal");

            modal.showModal();
        },
        close() {
            const modal = document.getElementById("CaptchaModal");

            modal.close();
        },
        onContinue() {
            this.close();
            this.$emit('onContinue');
        },
    }
}
</script>
