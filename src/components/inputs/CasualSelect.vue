<template>
    <div class="w-3/4">
        <label for="label" class="block text-sm font-medium leading-6 text-gray-900">
            <FontAwesomeIcon icon="fa-asterisk" style="color: gray" size="sm" />
        </label>
        <div class="flex flex-col">
            <div class="relative rounded-md shadow-sm">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center p-2">
                    <span class="text-gray-500 sm:text-sm">
                        <slot name="beforeValue" />
                    </span>
                </div>
                <select v-model="value"
                    :id="label"
                    :name="label"
                    :placeholder="placeholder"
                    type="text"
                    class="block w-full rounded-md border-0 py-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    placeholder="0.00" />
            </div>
            <span class="error d-flex justify-content-center text-sm" style="color: red">
                <slot name="errors" />
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CasualSelect',
}
</script>
