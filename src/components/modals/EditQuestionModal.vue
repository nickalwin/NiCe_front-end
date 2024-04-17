<template>
    <dialog id="EditQuestionModal" class="modal rounded-lg shadow-md">
        <div v-if="question" class="modal-box">
            <LoadingTemplate :isLoading="false" :center="true">
                <h1 class="text-xl sm:text-2xl font-bold mb-4">
                    {{ label }}
                </h1>

                <SingleRow>
                    <QuestionRating :question="question"
                        @onChange="question.answer = $event"
                    />
                </SingleRow>

                <SingleRow class="mt-20">
                    <textarea v-model="question.comment"
                        class="w-full mt-4 p-4 bg-gray-100 rounded"
                        :placeholder="$t('scan_page.add_a_comment')"/>
                </SingleRow>

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
                            @onClick="save"
                        />
                    </template>
                </DoubleRow>
            </LoadingTemplate>
        </div>
    </dialog>
</template>


<script>
import SingleRow from '@/components/layouts/SingleRow.vue';
import DoubleRow from '@/components/layouts/DoubleRow.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import SecondaryButton from '@/components/buttons/SecondaryButton.vue';
import LoadingTemplate from "@/components/utils/LoadingTemplate.vue";
import QuestionRating from '@/components/card/QuestionRating.vue';

export default {
    name: 'EditQuestionModal',
    emits: ['onCancel', 'onSave'],
    components: {
        SingleRow, DoubleRow, PrimaryButton, SecondaryButton, LoadingTemplate,
        QuestionRating,
    },
    data() {
        return {
            label: null,
            question: null,
        }
    },
    methods: {
        open(label, question) {
            this.label = label;
            this.question = question;

            const modal = document.getElementById("EditQuestionModal");

            modal.showModal();
        },
        close() {
            const modal = document.getElementById("EditQuestionModal");

            modal.close();
        },
        cancelOperation() {
            this.$emit('onCancel');
        },
        save() {
            this.$emit('onSave');
        }
    }
}
</script>
