<template>
    <div class="flex flex-col items-center justify-center text-gray-600 mt-52 px-4 sm:px-0">
        <h1 class="text-4xl sm:text-6xl font-semibold transition-all duration-500 ease-in-out">
            404
        </h1>

        <p class="text-xl sm:text-2xl mt-4 transition-all duration-500 ease-in-out">
            {{ $t("not_found_page.not_found") }}
        </p>

        <p class="mt-2 transition-all duration-500 ease-in-out">
            {{ $t("not_found_page.not_found_desc") }}
        </p>

        <PrimaryRouterLink
            :to="'/'"
            :label="$t('not_found_page.go_home')"
            class="mt-4 px-4 py-2 rounded bg-blue-500 text-white transition-all duration-500 ease-in-out hover:bg-blue-700"
        />
    </div>
</template>

<script>
import PrimaryRouterLink from "@/components/router-links/PrimaryRouterLink.vue";

export default {
    name: "NotFoundView",
    components: {
        PrimaryRouterLink,
    },
};
</script>
