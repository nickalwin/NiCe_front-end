<template>
    <footer class="footer cardflex flex-row p-5 bg-white rounded shadow-lg w-full mt-4" style="background-color: var(--color-secondary)">
        <div class="w-full flex flex-col">
            <h1 class="text-lg font-bold mb-4">
                {{ $t('footer_component.main') }}
            </h1>

            <!-- Contact Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="flex flex-col">
                    <h1 class="text-lg font-bold">
                        <FontAwesomeIcon icon="fa-phone" class="mr-2" />
                        {{ $t('footer_component.phone') }}
                    </h1>
                    <p class="text-base mt-2">+31 6 123456789</p>
                    <p class="text-base mt-2">
                        {{ $t('footer_component.when_to_call') }}
                    </p>
                </div>
                <div class="flex flex-col">
                    <h1 class="text-lg font-bold"><FontAwesomeIcon icon="fa-brands fa-whatsapp" class="mr-2" /> Whatsapp</h1>
                    <p class="text-base mt-2">
                        <a href="https://www.windesheim.nl">
                            {{ $t('footer_component.respond_1_hour') }}
                        </a>
                    </p>
                </div>
                <div class="flex flex-col">
                    <h1 class="text-lg font-bold"><FontAwesomeIcon icon="fa-envelope" class="mr-2" />Mail</h1>
                    <p class="text-base mt-2">
                        <a href="mailto:lectoraatnice@windesheim.nl">
                            {{ $t('footer_component.respond_24_hour') }}
                        </a>
                    </p>
                </div>
                <div class="flex flex-col">
                    <h1 class="text-lg font-bold"><FontAwesomeIcon icon="fa-brands fa-linkedin" class="mr-2" />LinkedIn</h1>
                    <p class="text-base mt-2"><a href="https://nl.linkedin.com/company/lectoraat-netwerken-in-een-circulaire-economie">LinkedIn</a></p>
                </div>
            </div>

            <!-- Other Tools -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div class="flex flex-col">
                    <h1 class="text-lg font-bold">
                        {{ $t('footer_component.other_scanning_tools') }}
                    </h1>
                    <p class="text-base mt-2"><a href="https://www.sdgquickscan.nl/">SDG Swiper</a></p>
                    <p class="text-base mt-2"><a href="https://www.telosduurzaamheidscan.nl/">Telos sustainability scan</a></p>
                    <p class="text-base mt-2"><a href="https://www.energietransitiewindesheim.nl/sdg-swiper/">Energy transition scanner</a></p>
                    <p class="text-base mt-2"><a href="https://app.carboncase.tst.energietransitiewindesheim.nl/">Carbon case estimator</a></p>
                </div>
                <div class="flex flex-col">
                    <h1 class="text-lg font-bold">
                        {{ $t('footer_component.quick_links') }}
                    </h1>
                    <p class="text-base mt-2"><a href="https://www.windesheim.nl">Hogeschool Windesheim</a></p>
                    <p class="text-base mt-2"><a href="https://www.windesheim.tech/technologie-trends/green-it/">Windesheim Green IT projects</a></p>
                    <p class="text-base mt-2"><a href="https://www.windesheim.nl/onderzoek/lectoraten/netwerken-in-een-circulaire-economie">Doctorate Networking in Circulair Economies</a></p>
                    <p class="text-base mt-2"><a href="https://www.windesheim.nl/onderzoek/lectoraten/energietransitie">Doctorate Energy transition</a></p>
                </div>
                <div class="flex flex-col">
                    <h1 class="text-lg font-bold">
                        {{ $t('footer_component.policies') }}
                    </h1>
                    <p class="text-base mt-2"><a href="/terms-and-conditions#privacy-policy">
                        {{ $t('footer_component.privacy_policy') }}
                    </a></p>
                    <p class="text-base mt-2"><a href="/terms-and-conditions#cookie-policy">
                        {{ $t('footer_component.cookie_policy') }}
                    </a></p>
                </div>
                <div class="flex flex-col">
                    <h1 class="text-lg font-bold">
                        {{ $t('footer_component.newsletter') }}
                    </h1>
                    <p class="text-base mt-2"><a href="https://analytics-eu.clickdimensions.com/cn/ah8eg/nb-lectoren-aanmeld">
                        {{ $t('footer_component.subscribe') }}
                    </a></p>
                </div>
            </div>
        </div>
    </footer>
</template>


<script>
export default {
    name: 'FooterComponent',
}
</script>
