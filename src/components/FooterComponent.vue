<template>
    <footer class="footer flex flex-row" style="background-color: var(--color-ternary)">
        <div class="w-full flex flex-col mt-10">
                    <div class="pr-40">
                        <h1 class="text-lg font-bold">Our offices</h1>
                        <p class="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                    <div class="flex flex-col md:flex-row mt-2 justify-between w-full">
                        <div class="mt-2 justify-between">
                            <h1 class="text-lg font-bold">Los Angeles</h1>
                            <h1 class="text-base mt-2">4556 Brendan Ferry Los Angeles, CA 90210</h1>
                        </div>
                        <div class="mt-2 justify-between">
                            <h1 class="text-lg font-bold">New York</h1>
                            <h1 class="text-base mt-2">8777 Walter Streets New York, NY 98767</h1>
                        </div>
                        <div class="mt-2 justify-between">
                            <h1 class="text-lg font-bold">Toronto</h1>
                            <h1 class="text-base mt-2">0981 Cynthia Pass Toronto, ON 45281</h1>
                        </div>
                        <div class="mt-2 justify-between">
                            <h1 class="text-lg font-bold">London</h1>
                            <h1 class="text-base mt-2">114 Cobble Lane London N1 2EF</h1>
                        </div>
                    </div>
                </div>
    </footer>
</template>

<script>
export default {
    name: 'FooterComponent',
    methods: {
        setTheme(theme) {
            localStorage.setItem('theme', theme);
            window.location.reload();
        }
    },
    computed: {
        theme() {
            var theme = localStorage.getItem('theme');

            if (!theme) {
                localStorage.setItem('theme', 'yellow');
                return 'yellow';
            }

            return theme;
        }
    },
}
</script>
