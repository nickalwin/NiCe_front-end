class LocalStorage
{

    static ActiveCheck() {
        let scanResultsValidUntil = new Date(parseInt(localStorage.getItem('scanResultsValidUntil'), 10));
        let contactInfoValidUntil = new Date(parseInt(localStorage.getItem('contactInfoValidUntil'), 10));

        let now = Date.now();

        if (localStorage.getItem('scanResultsValidUntil') && scanResultsValidUntil - now < 0) {
            localStorage.removeItem('scanResults');
            localStorage.removeItem('scanResultsValidUntil');
        }

        if (localStorage.getItem('contactInfoValidUntil') && contactInfoValidUntil - now < 0) {
            localStorage.removeItem('contactInfo');
            localStorage.removeItem('contactInfoValidUntil');
        }
    }

    static SetContactInfo(contactInfo) {
        localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
        localStorage.setItem('contactInfoValidUntil', Date.now() + 900000); // 15 minutes
    }

    static GetContactInfo() {
        return JSON.parse(localStorage.getItem('contactInfo'));
    }

    static ClearContactInfo() {
        localStorage.removeItem('contactInfo');
        localStorage.removeItem('contactInfoValidUntil');
    }

    static SetScanResults(scanResults) {
        localStorage.setItem('scanResults', JSON.stringify(scanResults));
        localStorage.setItem('scanResultsValidUntil', Date.now() + 86400000); // 24 hours
    }

    static GetScanResults() {
        return JSON.parse(localStorage.getItem('scanResults'));
    }

    static ClearScanResults() {
        localStorage.removeItem('scanResults');
        localStorage.removeItem('scanResultsValidUntil');
    }

}

export default LocalStorage;
