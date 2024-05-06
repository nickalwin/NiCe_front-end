<template>
    <footer class="footer cardflex flex-row p-5 bg-white rounded shadow-lg w-full mt-4" style="background-color: var(--color-secondary)">
        <div class="w-full flex flex-col">
            <h1 class="text-lg font-bold mb-4">Neem contact met ons op</h1>

            <!-- Contact Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="flex flex-col">
                    <h1 class="text-lg font-bold"><FontAwesomeIcon icon="fa-phone" class="mr-2" />Bel</h1>
                    <p class="text-base mt-2">+31 6 123456789</p>
                    <p class="text-base mt-2">Op werkdagen van 9.00 tot 17.00 uur</p>
                </div>
                <div class="flex flex-col">
                    <h1 class="text-lg font-bold"><FontAwesomeIcon icon="fa-brands fa-whatsapp" class="mr-2" /> Whatsapp</h1>
                    <p class="text-base mt-2"><a href="https://www.windesheim.nl">Reageert binnen 1 uur</a></p>
                </div>
                <div class="flex flex-col">
                    <h1 class="text-lg font-bold"><FontAwesomeIcon icon="fa-envelope" class="mr-2" />Mail</h1>
                    <p class="text-base mt-2"><a href="mailto:lectoraatnice@windesheim.nl">Reageert binnen 24 uur</a></p>
                </div>
                <div class="flex flex-col">
                    <h1 class="text-lg font-bold"><FontAwesomeIcon icon="fa-brands fa-linkedin" class="mr-2" />LinkedIn</h1>
                    <p class="text-base mt-2"><a href="https://nl.linkedin.com/company/lectoraat-netwerken-in-een-circulaire-economie">LinkedIn</a></p>
                </div>
            </div>

            <!-- Other Tools -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div class="flex flex-col">
                    <h1 class="text-lg font-bold">Other scanning tools</h1>
                    <p class="text-base mt-2"><a href="https://www.sdgquickscan.nl/">SDG Swiper</a></p>
                    <p class="text-base mt-2"><a href="https://www.telosduurzaamheidscan.nl/">Telos sustainability scan</a></p>
                    <p class="text-base mt-2"><a href="https://www.energietransitiewindesheim.nl/sdg-swiper/">Energy transition scanner</a></p>
                    <p class="text-base mt-2"><a href="https://app.carboncase.tst.energietransitiewindesheim.nl/">Carbon case estimator</a></p>
                </div>
                <div class="flex flex-col">
                    <h1 class="text-lg font-bold">Quick links</h1>
                    <p class="text-base mt-2"><a href="https://www.windesheim.nl">Hogeschool Windesheim</a></p>
                    <p class="text-base mt-2"><a href="https://www.windesheim.tech/technologie-trends/green-it/">Windesheim Green IT projects</a></p>
                    <p class="text-base mt-2"><a href="https://www.windesheim.nl/onderzoek/lectoraten/netwerken-in-een-circulaire-economie">Doctorate Networking in Circulair Economies</a></p>
                    <p class="text-base mt-2"><a href="https://www.windesheim.nl/onderzoek/lectoraten/energietransitie">Doctorate Energy transition</a></p>
                </div>
                <div class="flex flex-col">
                    <h1 class="text-lg font-bold">Policies</h1>
                    <p class="text-base mt-2"><a href="/terms-and-conditions#privacy-policy">Privacy Policy</a></p>
                    <p class="text-base mt-2"><a href="/terms-and-conditions#cookie-policy">Cookie Policy</a></p>
                </div>
                <div class="flex flex-col">
                    <h1 class="text-lg font-bold">Newsletter</h1>
                    <p class="text-base mt-2"><a href="https://analytics-eu.clickdimensions.com/cn/ah8eg/nb-lectoren-aanmeld">Subscribe to the NiCE newsletter</a></p>
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
