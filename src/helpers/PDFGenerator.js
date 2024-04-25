import { jsPDF } from "jspdf";
import i18n from '../i18n/index.js';

class PDFGenerator {
    constructor() {
        this.Config = {
            pdfBackgroundColor: "#fff578",
            headerFontSize: 40,
            mainTextFontSize: 15,
            leftMargin: 15,
            rightMargin: 10,
        }
    }

    async loadImage(path) {
        const response = await fetch(path);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    ApplyPDFBackgroundColor(doc) {
        doc.setFillColor(this.Config.pdfBackgroundColor);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
    }

    async GeneratePDF(params) {
        var doc = new jsPDF('p', 'pt', 'a4');
        var docWidth = doc.internal.pageSize.getWidth();

        // this.ApplyPDFBackgroundColor(doc);

        doc.setTextColor(0, 0, 0);

        doc.setFontSize(this.Config.headerFontSize);
        var mainHeader = i18n.global.t('pdf_report.main_header');
        var width = doc.getTextWidth(mainHeader);

        doc.text(mainHeader, (docWidth - width) / 2, 40);

        const imgData = await this.loadImage('/info.png');
        const imgWidth = 1078 / 2.5;
        const imgHeight = 522 / 2.5;
        doc.addImage(imgData, "PNG", (docWidth - imgWidth) / 2, 130, imgWidth, imgHeight);

        var mainText = i18n.global.t('pdf_report.main_text');
        var lines = doc.splitTextToSize(mainText, docWidth * 2.5);

        doc.setFontSize(this.Config.mainTextFontSize);
	    doc.text(this.Config.leftMargin, 70, lines);

        var ctx = document.getElementById('plot').getContext('2d');
        var ctxData = ctx.canvas.toDataURL('image/png');
        var plotWidth = ctx.canvas.width / 2.5;
        var plotHeight = ctx.canvas.height / 2.5;

        doc.addImage(ctxData, 'PNG', (docWidth - plotWidth) / 2, 400, plotWidth, plotHeight);

        var timestamp = new Date().toISOString().slice(0, 10);
        // doc.save(timestamp + "_NiCE_Report.pdf");
        window.open(doc.output('bloburl'), '_blank');
    }
}

export default PDFGenerator;
