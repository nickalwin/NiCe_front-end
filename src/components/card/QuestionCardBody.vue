<template>
    <div class="container">
        <h1 class="text-xl sm:text-2xl md:text-3xl">
            <strong>Dummy header</strong>
        </h1>

        <p class="text-xs sm:text-sm md:text-base">
            {{ getLocalizedQuestion() }}
        </p>

        <div class="flex justify-center my-6">
            <img :src="question.image" class="lg:w-full" alt="No image provided" />
        </div>

        <QuestionRating :question="question" @onChange="question.answer = $event" />

        <div class="tooltip-container mt-2">
            <div class="tooltip tooltip-info" :data-tip="$t('scan_page.give_extra_feedback')">
                <span v-if="isEyeOpen" class="text-lg font-bold" v-on:click="toggleEye(false)">
                    <FontAwesomeIcon icon="fa-eye" />
                </span>
                <span v-else class="text-lg font-bold " v-on:click="toggleEye(true)">
                    <FontAwesomeIcon icon="fa-eye-slash" />
                </span>
            </div>
            <div>
                <textarea v-model="question.comment" v-if="isEyeOpen"
                    class="w-full mt-4 p-4 bg-gray-100 rounded"
                    :placeholder="$t('scan_page.add_a_comment')"/>
            </div>
        </div>

        <div class="card-actions justify-end">
            <TernaryButton :label="$t('utils.previous')"
                @click="jumpToPreviousQuestion" />

            <PrimaryButton :label="$t('utils.next')" :disabled="question.answer === -2"
                @onClick="jumpToNextQuestion" />
        </div>
    </div>
</template>

<script>
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import TernaryButton from "../buttons/TernaryButton.vue";
import QuestionRating from "./QuestionRating.vue";

export default {
    name: 'QuestionCardBody',
    components: { PrimaryButton, TernaryButton, QuestionRating },
    emits: [
        'jumpToNextQuestion',
        'jumpToPreviousQuestion'
    ],
    props: {
        question: {
            required: true
        }
    },
    data() {
        return {
            isEyeOpen: false,
        }
    },
    watch: {
        question: {
            handler() {
                this.isEyeOpen = this.question.comment;
            },
            deep: true
        }
    },
    methods: {
        getLocalizedQuestion() {
            return this.question.data[this.$i18n.locale] ?
                    this.question.data[this.$i18n.locale].question :
                    this.question.data['nl'].question
        },
        toggleEye(isOpen) {
            this.isEyeOpen = isOpen;
        },
        jumpToPreviousQuestion() {
            this.$emit('jumpToPreviousQuestion');
        },
        jumpToNextQuestion() {
            this.$emit('jumpToNextQuestion');
        }
    }
}
</script>
