<template>
    <div class="w-3/4">
        <label :for="label" class="block text-sm font-medium leading-6 text-gray-900">
            {{ label }} <FontAwesomeIcon icon="fa-asterisk" style="color: gray" size="sm" />
        </label>
        <div class="flex flex-col">
            <div class="relative rounded-md shadow-sm">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center p-2">
                    <span class="text-gray-500 sm:text-sm">
                        <slot name="beforeValue" />
                    </span>
                </div>
                <input v-model="value"
                    :id="label"
                    :name="label"
                    :placeholder="placeholder"
                    type="text"
                    class="block w-full rounded-md border-0 py-3 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                     />
            </div>
            <span class="error d-flex justify-content-center text-sm" style="color: red">
                <slot name="errors" />
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: { required: true },
        label: { type: String, required: false },
        placeholder: { type: String, required: false, default: '' },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            value: this.modelValue,
        }
    },
    watch: {
        value(newValue, oldValue) {
            this.$emit('update:modelValue', newValue);
        },
        modelValue(newValue, oldValue) {
            this.value = newValue;
        },
    },
    mounted() {
        this.$emit('update:modelValue', this.modelValue);
    },
}
</script>
