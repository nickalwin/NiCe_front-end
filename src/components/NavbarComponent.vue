<template>
    <div class="navbar" style="background-color: var(--color-ternary)">
        <div class="navbar-start">
            <img src="/LeftNavIcon.png" alt="" width="80" />

            <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>

                <ul tabindex="0"
                    class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-100 rounded-box w-52">
                    <li class="hover:bg-gray-200">
                        <RouterLink to="/">
                            {{ $t('navbar_component.home_route') }}
                            <FontAwesomeIcon icon="fa-house" />
                        </RouterLink>
                    </li>
                    <li class="hover:bg-gray-200">
                        <a v-on:click="HandleUniqueCode">
                            {{ $t('navbar_component.unique_code') }}
                            <FontAwesomeIcon icon="fa-key" />
                        </a>
                    </li>
                    <li class="hover:bg-gray-200">
                        <RouterLink to="/history">
                            {{ $t('navbar_component.history_route') }}
                            <FontAwesomeIcon icon="fa-bars" />
                        </RouterLink>
                    </li>
                    <!-- <li class="hover:bg-gray-200">
                        <a v-if="theme == 'yellow'" v-on:click="setTheme('green')">
                            {{ $t('navbar_component.green_theme') }}
                            <FontAwesomeIcon icon="fa-leaf" />
                        </a>
                        <a v-else v-on:click="setTheme('yellow')">
                            {{ $t('navbar_component.yellow_theme') }}
                            <FontAwesomeIcon icon="fa-sun" />
                        </a>
                    </li> -->
                    <li>
                        <a>{{ $t('navbar_component.pick_language') }}</a>
                        <ul class="p-2">
                            <li>
                            <li class="hover:bg-gray-200" v-on:click="setLang('en')">
                                <div class="row">
                                    <div class="col">
                                        <strong>EN</strong>
                                    </div>
                                    <div class="col">
                                        <img src="/uk_flag.png" alt="" width="20" />
                                    </div>
                                </div>
                            </li>
                            <li class="hover:bg-gray-200" v-on:click="setLang('nl')">
                                <div class="row">
                                    <div class="col">
                                        <strong>NL</strong>
                                    </div>
                                    <div class="col">
                                        <img src="/nl_flag.png" alt="" width="20" />
                                    </div>
                                </div>
                            </li>
                    </li>
                </ul>
                </li>
                </ul>
            </div>
        </div>

        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
                <li>
                    <RouterLink to="/">
                        {{ $t('navbar_component.home_route') }}
                        <FontAwesomeIcon icon="fa-house" />
                    </RouterLink>
                </li>
                <li>
                    <a v-on:click="HandleUniqueCode">
                        {{ $t('navbar_component.unique_code') }}
                        <FontAwesomeIcon icon="fa-key" />
                    </a>
                </li>
                <li>
                    <RouterLink to="/history">
                        {{ $t('navbar_component.history_route') }}
                        <FontAwesomeIcon icon="fa-bars" />
                    </RouterLink>
                </li>
                <!-- <li>
                    <a v-if="theme == 'yellow'" v-on:click="setTheme('green')">
                        {{ $t('navbar_component.green_theme') }}
                        <FontAwesomeIcon icon="fa-leaf" />
                    </a>
                    <a v-else v-on:click="setTheme('yellow')">
                        {{ $t('navbar_component.yellow_theme') }}
                        <FontAwesomeIcon icon="fa-sun" />
                    </a>
                </li> -->
                <li>
                    <div class="dropdown dropdown-hover">
                        <div tabindex="0" role="button">
                            <strong>{{ $i18n.locale == 'en' ? 'EN ' : 'NL ' }}</strong>
                            <FontAwesomeIcon icon="fa-caret-down" />
                        </div>
                        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-box w-28">
                            <li class="hover:bg-gray-200" v-on:click="setLang('en')">
                                <div class="row">
                                    <div class="col">
                                        <strong>EN</strong>
                                    </div>
                                    <div class="col">
                                        <img src="/uk_flag.png" alt="" width="20" />
                                    </div>
                                </div>
                            </li>
                            <li class="hover:bg-gray-200" v-on:click="setLang('nl')">
                                <div class="row">
                                    <div class="col">
                                        <strong>NL</strong>
                                    </div>
                                    <div class="col">
                                        <img src="/nl_flag.png" alt="" width="20" />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <div class="navbar-end">
            <img src="/RightNavIcon.png" alt="" width="140" />
        </div>
    </div>
</template>

<script>
import PopupHelper from "@/helpers/PopupHelper.js";
import RouteList from "@/helpers/RouteList.js";
import Swal from 'sweetalert2';
import i18n from '../i18n/index.js';

export default {
    name: 'NavbarComponent',
    methods: {
        setTheme(theme) {
            localStorage.setItem('theme', theme);
            window.location.reload();
        },
        setLang(lang) {
            this.$i18n.locale = lang;
            localStorage.setItem('lang', lang);
        },
        async HandleUniqueCode() {
            const steps = ['1', '2', '3']
            const Queue = Swal.mixin({
                progressSteps: steps,
                confirmButtonText: i18n.global.t('utils.next'),
                cancelButtonText: i18n.global.t('utils.cancel'),
                showClass: { backdrop: 'swal2-noanimation' },
                hideClass: { backdrop: 'swal2-noanimation' },
            });

            Queue.fire({
                title: i18n.global.t('navbar_component.enter_your_code'),
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off',
                    placeholder: '4374860b-c6ab-403e-8c9e-1ccd2b6ece20'
                },
                heightAuto: false,
                currentProgressStep: 0,
                showCancelButton: true,
                allowOutsideClick: () => false,
                preConfirm: (code) => {
                    const uuidRegex = /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-4[0-9a-fA-F]{3}\-(8|9|a|b|A|B)[0-9a-fA-F]{3}\-[0-9a-fA-F]{12}$/;

                    if (!code) {
                        Swal.showValidationMessage(i18n.global.t('errors.missing_fields'));
                    } else if (!uuidRegex.test(code)) {
                        Swal.showValidationMessage(i18n.global.t('errors.missing_scan_code'));
                    } else {
                        return code;
                    }
                }
            }).then((result) => {
                if (!result.isConfirmed) {
                    Swal.close();
                } else {
                    Queue.fire({
                        title: i18n.global.t('utils.loading'),
                        currentProgressStep: 1,
                        heightAuto: false,
                        allowOutsideClick: () => false,
                        willOpen: () => {
                            Swal.showLoading();
                        },
                        showConfirmButton: false,
                    });

                    axios.get(`/api/scan-codes/${result.value}`, {

                    }).then((response) => {
                        let data = response.data;
                        let scanUuid = data.scan_uuid;
                        let isEditable = data.editable;

                        Queue.fire({
                            icon: 'success',
                            title: i18n.global.t('navbar_component.scan_code_is_valid'),
                            text: isEditable ? i18n.global.t('navbar_component.scan_editable') : i18n.global.t('navbar_component.scan_visitable'),
                            currentProgressStep: 2,
                            showCancelButton: true,
                            showConfirmButton: true,
                            confirmButtonText: isEditable ? i18n.global.t('utils.edit') : i18n.global.t('utils.view'),
                            heightAuto: false,
                            preConfirm: (result) => {
                                if (result) {
                                    this.$router.push(RouteList.Result + "/" + scanUuid);
                                } else {
                                    Swal.close();
                                }
                            }
                        });

                    }).catch((error) => {
                        PopupHelper.DisplayErrorPopupWithTryAgain(error.response.data, () => {
                            this.HandleUniqueCode();
                        });
                    });
                }
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
    mounted() {
        var lang = localStorage.getItem('lang');

        if (lang) {
            this.$i18n.locale = lang;
        }
    }
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
    .navbar-end img {
        width: 100px;
    }

    .navbar-start img {
        width: 40px;
    }
}

@media screen and (max-width: 480px) {
    .navbar-end img {
        width: 60px;
    }

    .navbar-start img {
        width: 20px;
    }
}
</style>
