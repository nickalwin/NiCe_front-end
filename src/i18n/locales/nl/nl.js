import { maxLength } from "@vuelidate/validators";

export default {
    navbar_component: {
        home_route: "Thuis",
        unique_code: "Unieke code",
        history_route: "Geschiedenis",
        green_theme: "Groen thema",
        yellow_theme: "Geel thema",
        enter_your_code: "Voer uw unieke code in",
        scan_code_is_valid: "Scan code is geldig",
        scan_visitable: "U kunt nu de scan bezoeken",
        scan_editable: "U kunt nu de scan bewerken",
        pick_language: "Kies een taal",
    },
    summary_component: {
        all_in_one: "Alles-in-één platform",
        all_in_one_desc: "Van adaptieve vragen tot gedetailleerde prestatierapporten, we hebben alles wat u nodig heeft om een nuttige scan voor uw bedrijf te maken. Geniet van een gebruiksvriendelijke interface, toegankelijk op zowel mobiel als desktop, en krijg de ondersteuning die u nodig heeft, wanneer u die nodig heeft.",
        detailed_results: "Gedetailleerde resultaten",
        detailed_results_desc: "Toegang tot uitgebreide resultaten van uw test voor een diepgaande analyse",
        graphs_and_plots: "Grafieken en plots",
        graphs_and_plots_desc: "Visualiseer uw gegevens met onze gebruiksvriendelijke grafieken en plots",
        pdf_reports: "PDF-rapporten",
        pdf_reports_desc: "Download een gedetailleerd PDF-rapport van uw test voor offline review",
        internationality: "Internationaliteit",
        internationality_desc: "Ons platform is beschikbaar in meerdere talen en eenheden",
        adaptive_questions: "Adaptieve vragen",
        adaptive_questions_desc: "Onze vragen zijn afgestemd op uw specifieke situatie",
        reporting_and_feedback: "Rapportage en feedback",
        reporting_and_feedback_desc: "Ontvang feedback op uw test en volg uw voortgang",
        disability_features: "Toegankelijkheidsfuncties",
        disability_features_desc: "Ons platform is ontworpen om toegankelijk te zijn voor iedereen",
        mobile_friendly: "Mobielvriendelijk",
        mobile_friendly_desc: "Ons platform is ontworpen om toegankelijk te zijn op alle apparaten",
    },
    contact_info_component: {
        contact_info: "Contactinformatie",
        contact_info_desc: "We horen graag van u!",
        send_us_a_message: "Stuur ons een bericht",
    },
    home_page: {
        check_your_impact_1: "Controleer je impact op",
        check_your_impact_2: "het milieu",
        understanding_your_env: "Het begrijpen van uw milieueffect is de eerste stap naar het maken van meer duurzame keuzes.",
        get_started: "Beginnen",
        show_guide: "Toon gids",
    },
    not_found_page: {
        not_found: "Niet gevonden",
        not_found_desc: "De pagina die u zoekt bestaat niet",
        go_home: "Ga naar huis",
    },
    scan_page: {
        add_a_comment: "Voeg een opmerking toe",
        low_score: "Helemaal niet van toepassing",
        high_score: "Volledig van toepassing",
        give_extra_feedback: "Geef extra feedback",
        score_text_1: "Niet van toepassing",
        score_text_2: "Minder van toepassing",
        score_text_3: "Gedeeltelijk van toepassing",
        score_text_4: "Meestal van toepassing",
        score_text_5: "Volledig van toepassing",
        i_dont_know: "Weet ik niet",
        not_applicable: "Niet van toepassing",
    },
    results_page: {
        main_header: "Rapport Circulaire scan",
        download_pdf: "Download PDF",
        main_text: "Bedankt voor het invullen van de circulaire scan. In dit document kun u uw resultaten vinden. Het rapport is ingedeeld in de 6 hoofd categorieën van de test innovatie, productie, ketensamenwerking, arbeid, facilitair en ambitie. Het model kunt u hieronder vinden. Hoe hoger u op een categorie scoort, hoe beter u al bezig bent met de circulaire economie op dat gebied.",
        you_scored: "U scoorde",
        out_of: "van de",
        top_answers: "Top antwoorden",
        lowest_answers: "Laagste antwoorden",
        dont_know_answers: "Weet niet antwoorden",
        tips_to_improve: "Tips om te verbeteren",
        additional_tools: "Extra tools",
    },
    history_page: {
        last_codes: "De unieke codes van uw laatste scan",
        editable: "Bewerkbaar",
        read_only: "Alleen lezen",
        no_scans: "Geen scans gevonden",
    },
    fields: {
        name: "Naam",
        your_name: "Uw naam",
        first_name: "Voornaam",
        your_first_name: "Uw voornaam",
        last_name: "Achternaam",
        your_last_name: "Uw achternaam",
        email: "E-mail",
        your_email: "Uw e-mail",
        sector: "Sector",
        your_sector: "Uw sector",
        phone_number: "Telefoonnummer",
        your_phone_number: "Uw telefoonnummer",
        subject: "Onderwerp",
        your_subject: "Uw onderwerp",
        message: "Bericht",
        your_message: "Uw bericht",
        scan_name: "Scan naam",
        somebodys_scan: "'s scan",
        statement: "Verklaring",
        statement_c: "VERKLARING",
        question: "Vraag",
        question_c: "VRAAG",
        questions: "Vragen",
        answers: "Antwoorden",
        comments: "Opmerkingen",
        actions: "Acties",
    },
    utils: {
        optional: "Optioneel",
        send: "Verzenden",
        fill_in_info: "Vul informatie in",
        select_sector: "Selecteer sector",
        continue: "Doorgaan",
        cancel: "Annuleren",
        fill_in_ucode: "Vul uw scan code in",
        next: "Volgende",
        previous: "Vorige",
        view: "Bekijken",
        loading: "Laden...",
        copy: "Kopiëren",
        save: "Opslaan",
        try_again: "Probeer opnieuw",
        edit: "Bewerk",
        copied_to_clipboard: "Gekopieerd naar klembord",
        no_comment: "Geen opmerking",
        edit_score: "Score bewerken 1-5",
        i_aggree_to: "Ik ga ak",
        terms_and_conditions: "met de algemene voorwaarden",
        required_fields: "Verplichte velden",
        select_option: "Selecteer een optie",
    },
    errors: {
        error: "Fout",
        oh_no_smth_wrong: "Oh nee, er is iets misgegaan!",
        missing_fields: "Vul alle velden in",
        invalid_email: "Voer een geldig e-mailadres in",
        missing_ucode: "Vul een unieke code in",
        mail_not_sent: "Mail kon niet worden verzonden",
    },
    validation: {
        required: "Dit veld is verplicht",
        email: "Ongeldig e-mailadres",
        maxLength: "Dit veld moet minder dan 100 tekens bevatten",
    },
    success: {
        success: "Succes",
        operation_success: "De operatie is geslaagd!",
        mail_sent: "Mail succesvol verzonden!",
    }
}
