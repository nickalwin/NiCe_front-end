<template>
    <footer class="footer flex flex-row" style="background-color: var(--color-ternary)">
        <div class="w-full flex flex-col mt-10 bg-pink-400">
                    <h1 class="text-lg font-bold w-full">Neem contact met ons op</h1>
                    <div class="flex flex-col md:flex-row mt-2 justify-between w-full">
                        <div class="mt-2 justify-between">
                            <h1 class="text-lg font-bold"><FontAwesomeIcon icon="fa-phone" class="mr-2" />Bel</h1>
                            <h1 class="text-base mt-2"><a>+31 6 123456789</a></h1>
                            <h1 class="text-base mt-2"><a>On weekdays from 9.00 till 17.00</a></h1>
                            
                        </div>
                        <div class="mt-2 justify-between">
                            <h1 class="text-lg font-bold"><font-awesomeIcon icon="fa-brands fa-whatsapp" /> Whatsapp</h1> 
                            <h1 class="text-base mt-2"><a href="https://www.windesheim.nl">Reacts within 1 hour</a></h1>    
                        </div>
                        <div class="mt-2 justify-between">
                            <h1 class="text-lg font-bold"><FontAwesomeIcon icon="fa-envelope" class="mr-2" />Mail</h1>
                            <h1 class="text-base mt-2"><a href="mailto:lectoraatnice@windesheim.nl">Reacts within 24h</a></h1>  
                    </div>
                    <div class="mt-2 justify-between">
                            <h1 class="text-lg font-bold"><FontAwesomeIcon icon="fa-brands fa-linkedin" class="mr-2" />LinkedIn</h1>
                            <h1 class="text-base mt-2"><a href="https://nl.linkedin.com/company/lectoraat-netwerken-in-een-circulaire-economie">LinkedIn</a></h1>
                    </div>
                </div>
                    <div class="flex flex-col md:flex-row mt-2 justify-between w-full">
                        <div class="mt-2 justify-between">
                            <h1 class="text-lg font-bold">Other scanning tools</h1>
                            <h1 class="text-base mt-2"><a href="https://www.sdgquickscan.nl/">SDG Swiper</a></h1>
                            <h1 class="text-base mt-2"><a href="https://www.telosduurzaamheidscan.nl/">Telos sustainability scan</a></h1>
                            <h1 class="text-base mt-2"><a href="https://www.energietransitiewindesheim.nl/sdg-swiper/">Energy transition scanner</a></h1>
                            <h1 class="text-base mt-2"><a href="https://app.carboncase.tst.energietransitiewindesheim.nl/">Carbon case estimator</a></h1>
                            
                        </div>
                        <div class="mt-2 justify-between">
                            <h1 class="text-lg font-bold">Quick links</h1>
                            <h1 class="text-base mt-2"><a href="https://www.windesheim.nl">Hogeschool Windesheim</a></h1>
                            <h1 class="text-base mt-2"><a href="https://www.windesheim.tech/technologie-trends/green-it/">Windesheim Green IT projects</a></h1>
                            <h1 class="text-base mt-2"><a href="https://www.windesheim.nl/onderzoek/lectoraten/netwerken-in-een-circulaire-economie">Doctorate Networking in Circulair Economies</a></h1>
                            <h1 class="text-base mt-2"><a href="https://www.windesheim.nl/onderzoek/lectoraten/energietransitie">Doctorate Energy transition</a></h1>    
                        </div>
                        <div class="mt-2 justify-between">
                            <h1 class="text-lg font-bold">Policies</h1>
                            <h1 class="text-base mt-2"><a href="https://www.google.nl">Privacy Policy</a></h1>
                            <h1 class="text-base mt-2"><a href="https://www.google.nl">Cookie Policy</a></h1>
                        </div>
                        <div class="mt-2 justify-between">
                            <h1 class="text-lg font-bold">Newsletter</h1>
                            <h1 class="text-base mt-2"><a href="https://analytics-eu.clickdimensions.com/cn/ah8eg/nb-lectoren-aanmeld">Subscribe to the NiCE newsletter</a></h1>
                            
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
