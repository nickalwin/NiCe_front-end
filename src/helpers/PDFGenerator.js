import { jsPDF } from "jspdf";
import i18n from '../i18n/index.js';
import 'jspdf-autotable';
import ColorHelper from './ColorHelper.js';

class PDFGenerator {
    constructor(tableData) {
        this.Config = {
            pdfBackgroundColor: "#fff578",
            headerFontSize: 40,
            mainTextFontSize: 15,
            leftMargin: 15,
            rightMargin: 10,
        }
        this.tableData = tableData;
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

    getHeadRowsForTables() {
        return [
            {
                number: i18n.global.t('fields.number'),
                question: i18n.global.t('fields.question'),
                answer: i18n.global.t('fields.answer'),
                comment: i18n.global.t('fields.comment'),
            }
        ];
    }

    getLocalizedQuestion(question) {
        let data = JSON.parse(question.question_data);
        var locale = i18n.global.locale.value;

        return data[locale] ?
            data[locale].question :
            data.en.question;
    }

    getLocalizedCategory(category) {
        let data = JSON.parse(category.category_data);
        var locale = i18n.global.locale.value;

        return data[locale] ?
            data[locale].name :
            data.en.name;
    }

    getBodyRowsForTables(questions) {
        return questions.grouped_answers.map((question, index) => {
            return {
                number: index + 1,
                question: this.getLocalizedQuestion(question),
                answer: question.answer != -1 ? question.answer : '?',
                comment: question.comment ?? "None",
            }
        });
    }

    async generatePDF(params) {
        var doc = new jsPDF('p', 'pt', 'a4');
        var docWidth = doc.internal.pageSize.getWidth();

        doc.setTextColor(0, 0, 0);

        doc.setFontSize(this.Config.headerFontSize);
        var mainHeader = i18n.global.t('pdf_report.main_header');
        var width = doc.getTextWidth(mainHeader);

        doc.setDrawColor(0);
        doc.setFillColor(240, 240, 240);
        doc.rect(0, 0, docWidth, 50, 'FD');

        doc.setTextColor(0, 0, 128);
        doc.text(mainHeader, (docWidth - width) / 2, 40);

        var mainText = i18n.global.t('pdf_report.main_text');
        var lines = doc.splitTextToSize(mainText, docWidth * 2.5);

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(this.Config.mainTextFontSize);
        doc.text(this.Config.leftMargin, 70, lines, {lineSpacing: 10});

        const imgData = await this.loadImage('/info.png');
        const imgWidth = 1078 / 2.5;
        const imgHeight = 522 / 2.5;
        doc.addImage(imgData, "PNG", (docWidth - imgWidth) / 2, 130, imgWidth, imgHeight);

        var ctx = document.getElementById('plot').getContext('2d');
        var ctxData = ctx.canvas.toDataURL('image/png');
        var plotWidth = ctx.canvas.width;
        var plotHeight = ctx.canvas.height;
        if (plotWidth > docWidth) {
            var ratio = docWidth / plotWidth;

            plotWidth *= ratio;
            plotHeight *= ratio;
        }
        let plotLeftMargin = 20;
        plotWidth -= plotLeftMargin;

        doc.addImage(ctxData, 'PNG', (docWidth - plotWidth) / 2, 400, plotWidth, plotHeight);

        var tablePos = 1080;

        for (const table of this.tableData) {
            let category = table.category;
            let questions = table.questions;
            let categoryName = this.getLocalizedCategory(category);

            doc.autoTable({
                head: this.getHeadRowsForTables(),
                body: this.getBodyRowsForTables(questions),
                styles: { halign: 'center', fillColor: [235, 235, 235], textColor: [0, 0, 0], lineWidth: 1 },
                startY: tablePos,
                willDrawPage: function (data) {
                    doc.setFillColor(173, 216, 230);
                    doc.rect(data.settings.margin.left, 20, docWidth - data.settings.margin.left * 2, 30, 'F');

                    doc.setTextColor(0, 0, 128);
                    doc.text(categoryName, data.settings.margin.left + 15, 40);
                },
                didParseCell: function (data) {
                    if (data.column.index !== 2)
                        return;

                    if (data.cell.raw === '?')
                        data.cell.styles.fillColor = [255, 0, 0];

                    if (isNaN(data.cell.raw))
                        return;

                    data.cell.styles.fillColor = ColorHelper.GetRGBColorForAnswer(data.cell.raw);
                },
                margin: { top: 60 },
            })

            tablePos += 1000;
        }

        var pageCount = doc.internal.getNumberOfPages();
        for (var i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setTextColor(100);
            doc.setFontSize(10);
            doc.text('Page ' + String(i) + ' of ' + String(pageCount), docWidth / 2 - 30, 820);
        }

        window.open(doc.output('bloburl'), '_blank');
        // var timestamp = new Date().toISOString().slice(0, 10);
        // doc.save(timestamp + "_NiCE_Report.pdf");
    }
}

export default PDFGenerator;
