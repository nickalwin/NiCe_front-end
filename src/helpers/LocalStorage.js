class LocalStorage
{

    static ActiveCheck() {
        let scanResultsValidUntil = new Date(parseInt(localStorage.getItem('scanResultsValidUntil'), 10));

        let now = Date.now();

        if (localStorage.getItem('scanResultsValidUntil') && scanResultsValidUntil - now < 0) {
            localStorage.removeItem('scanResults');
            localStorage.removeItem('scanResultsValidUntil');
            localStorage.removeItem('contactInfo');
        }
    }

    static SetContactInfo(contactInfo) {
        localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
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

    static TryGetLastCodes() {
        return JSON.parse(localStorage.getItem('lastCodes'));
    }

    static SetLastCodes(lastCodes) {
        localStorage.setItem('lastCodes', JSON.stringify(lastCodes));
    }

}

export default LocalStorage;
