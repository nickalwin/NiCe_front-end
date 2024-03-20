<template>
    <div class="navbar" style="background-color: var(--color-ternary)">
        <div class="navbar-start">
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <a>{{ $t('navbar_component.home_route') }}</a>
                    </li>
                    <li>
                        <a v-on:click="HandleUniqueCode">{{ $t('navbar_component.unique_code') }}</a>
                    </li>
                    <li>
                        <a v-if="theme == 'yellow'" v-on:click="setTheme('green')">
                            {{ $t('navbar_component.green_theme') }} <FontAwesomeIcon icon="fa-leaf" />
                        </a>
                        <a v-else v-on:click="setTheme('yellow')">
                            {{ $t('navbar_component.yellow_theme') }} <FontAwesomeIcon icon="fa-sun" />
                        </a>
                    </li>
                    <li v-for="(lang, i) in langs" :key="`Lang${i}`" v-on:click="setLang(lang)">
                        <strong>{{ lang }}</strong>
                    </li>
                </ul>
            </div>

            <img src="/LeftNavIcon.png" alt="" width="50"/>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1 text-xl font-bold text-gray-500">
                <li>
                    <RouterLink to="/">{{ $t('navbar_component.home_route') }}</RouterLink>
                </li>
                <li>
                    <a v-on:click="HandleUniqueCode">{{ $t('navbar_component.unique_code') }}</a>
                </li>
                <li>
                    <a v-if="theme == 'yellow'" v-on:click="setTheme('green')">
                        {{ $t('navbar_component.green_theme') }} <FontAwesomeIcon icon="fa-leaf" />
                    </a>
                    <a v-else v-on:click="setTheme('yellow')">
                        {{ $t('navbar_component.yellow_theme') }} <FontAwesomeIcon icon="fa-sun" />
                    </a>
                </li>
                <li>
                    <div class="dropdown">
                        <div tabindex="0" role="button">{{ $i18n.locale }}</div>
                        <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                            <li v-for="(lang, i) in langs" :key="`Lang${i}`" v-on:click="setLang(lang)">
                                <strong>{{ lang }}</strong>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <div class="navbar-end">
            <img src="/RightNavIcon.png" alt="" width="140"/>
        </div>
    </div>
</template>

<script>
import PopupHelper from "@/helpers/PopupHelper.js";

export default {
    name: 'NavbarComponent',
    data() {
        return {
            langs: ['en', 'nl']
        }
    },
    methods: {
        setTheme(theme) {
            localStorage.setItem('theme', theme);
            window.location.reload();
        },
        setLang(lang) {
            this.$i18n.locale = lang;
        },
        HandleUniqueCode() {
            PopupHelper.DisplayUniqueCodePopup((Result) => {
                //TODO: Handle unique code
            });
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
