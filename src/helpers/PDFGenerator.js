import { jsPDF } from "jspdf";
import i18n from '../i18n/index.js';
import 'jspdf-autotable';
import ColorHelper from './ColorHelper.js';

class PDFGenerator {
    constructor(answersData, perCategoryData, locales) {
        this.Config = {
            pdfBackgroundColor: "#fff578",
            headerFontSize: 40,
            mainTextFontSize: 15,
            leftMargin: 15,
            rightMargin: 10,
        }
        this.answersData = answersData;
        this.perCategoryData = perCategoryData;
        this.locales = locales;
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

    getLocalizedPdfSegment(data) {
        var locale = i18n.global.locale.value;

        return data[locale] ?
            data[locale].data :
            data.en.data;
    }

    getBodyRowsForTables(questions) {
        return questions.grouped_answers.map((question, index) => {
            let answer = question.is_statement ? (
                question.answer == 1 ? i18n.global.t('scan_page.agree') : i18n.global.t('scan_page.disagree')
            ) : question.answer != -1 ? question.answer : '?';

            return {
                number: index + 1,
                question: this.getLocalizedQuestion(question),
                answer: answer,
                comment: question.comment ?? "None",
            }
        });
    }

    colorCell(data, index) {
        if (data.column.index !== index)
            return;

        // if (data.cell.raw === '?')
            // data.cell.styles.fillColor = [255, 0, 0];

        if (data.cell.raw === i18n.global.t('scan_page.agree')) {
            data.cell.styles.fillColor = [16, 185, 129];
            return;
        } else if (data.cell.raw === i18n.global.t('scan_page.disagree')) {
            data.cell.styles.fillColor = [185, 28, 28];
            return;
        } else if (isNaN(data.cell.raw))
            return;

        data.cell.styles.fillColor = ColorHelper.GetRGBColorForAnswer(data.cell.raw);
    }

    async generatePDF(params) {
        var doc = new jsPDF('p', 'pt', 'a4');
        var docWidth = doc.internal.pageSize.getWidth();

        doc.setTextColor(0, 0, 0);

        doc.setFontSize(this.Config.headerFontSize);
        var mainHeader = this.getLocalizedPdfSegment(this.locales.Title);
        var width = doc.getTextWidth(mainHeader);

        doc.setDrawColor(0);
        doc.setFillColor(240, 240, 240);
        doc.rect(0, 0, docWidth, 50, 'FD');

        doc.setTextColor(0, 0, 128);
        doc.text(mainHeader, (docWidth - width) / 2, 40);

        var mainText = this.getLocalizedPdfSegment(this.locales.Introduction);
        var lines = doc.splitTextToSize(mainText, docWidth * 2.5);

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(this.Config.mainTextFontSize);
        doc.text(this.Config.leftMargin, 70, lines, {lineSpacing: 10});

        const imgData = this.locales.Image;
        const imgWidth = 1078 / 2.5;
        const imgHeight = 522 / 2.5;
        doc.addImage(imgData, "PNG", (docWidth - imgWidth) / 2, 130, imgWidth, imgHeight);

        var beforePlotText = this.getLocalizedPdfSegment(this.locales.BeforePlot);
        var beforePlotLines = doc.splitTextToSize(beforePlotText, docWidth - 10);

        doc.text(this.Config.leftMargin, 130 + imgHeight + 20, beforePlotLines, {lineSpacing: 10});

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

        doc.addImage(ctxData, 'PNG', (docWidth - plotWidth) / 2, 430, plotWidth, plotHeight);

        var afterPlotText = this.getLocalizedPdfSegment(this.locales.AfterPlot);
        var afterPlotLines = doc.splitTextToSize(afterPlotText, docWidth - 10);

        doc.text(this.Config.leftMargin, 430 + plotHeight + 60, afterPlotLines, {lineSpacing: 10});


        let self = this;

        doc.addPage();

        for (const categoryStats of this.perCategoryData) {
            let label = categoryStats.label;
            let mean = categoryStats.mean.toFixed(2);

            doc.setFontSize(18);
            doc.setTextColor(40);
            doc.setFillColor(173, 216, 230);
            doc.rect(40, 30, docWidth - 80, 30, 'F');
            doc.text(label + `   ${mean} / 5.00`, 45, 49);

            let dontKnowData = categoryStats.dontKnownAnswers.map(dontKnow => {
                return ['?', this.getLocalizedQuestion(dontKnow)];
            });

            doc.setFontSize(16);
            doc.text(i18n.global.t('fields.dont_know_questions'), 40, 100);
            doc.autoTable({
                startY: 110,
                head: [[i18n.global.t('fields.answer'), i18n.global.t('fields.question')]],
                body: dontKnowData,
                theme: 'striped',
                styles: { halign: 'center', fillColor: [235, 235, 235], textColor: [0, 0, 0], lineWidth: 2 },
            });

            let lowAnswerData = categoryStats.lowestAnswers.map(lowAnswer => {
                return [lowAnswer.answer, this.getLocalizedQuestion(lowAnswer)];
            });

            doc.setFontSize(16);
            doc.text(i18n.global.t('fields.low_score_questions'), 40, doc.previousAutoTable.finalY + 25);
            doc.autoTable({
                startY: doc.previousAutoTable.finalY + 30,
                head: [[i18n.global.t('fields.answer'), i18n.global.t('fields.question')]],
                body: lowAnswerData,
                theme: 'striped',
                didParseCell: function (data) {
                    self.colorCell(data, 0);
                },
                styles: { halign: 'center', fillColor: [235, 235, 235], textColor: [0, 0, 0], lineWidth: 2 },
            });

            let topAnswerData = categoryStats.topAnswers.map(topAnswer => {
                return [topAnswer.answer, this.getLocalizedQuestion(topAnswer)];
            });

            doc.setFontSize(16);
            doc.text(i18n.global.t('fields.top_score_questions'), 40, doc.previousAutoTable.finalY + 25);
            doc.autoTable({
                startY: doc.previousAutoTable.finalY + 30,
                head: [[i18n.global.t('fields.answer'), i18n.global.t('fields.question')]],
                body: topAnswerData,
                theme: 'striped',
                didParseCell: function (data) {
                    self.colorCell(data, 0);
                },
                styles: { halign: 'center', fillColor: [235, 235, 235], textColor: [0, 0, 0], lineWidth: 2 },
            });

            let tricksData = categoryStats.advices.map(advice => {
                return [advice];
            });

            doc.setFontSize(16);
            doc.text(i18n.global.t('fields.tricks_tips'), 40, doc.previousAutoTable.finalY + 25);
            doc.autoTable({
                startY: doc.previousAutoTable.finalY + 30,
                head: [[i18n.global.t('fields.elements')]],
                body: tricksData,
                theme: 'striped',
                didParseCell: function (data) {
                    self.colorCell(data, 0);
                },
                styles: { halign: 'center', fillColor: [235, 235, 235], textColor: [0, 0, 0], lineWidth: 2 },
            });

            let linksData = categoryStats.links.map(link => {
                return [link.name, link.href];
            });

            doc.setFontSize(16);
            doc.text(i18n.global.t('fields.useful_links'), 40, doc.previousAutoTable.finalY + 25);
            doc.autoTable({
                startY: doc.previousAutoTable.finalY + 30,
                head: [[i18n.global.t('fields.tool_name'), i18n.global.t('fields.link')]],
                body: linksData,
                theme: 'striped',
                didParseCell: function (data) {
                    self.colorCell(data, 0);
                },
                styles: { halign: 'center', fillColor: [235, 235, 235], textColor: [0, 0, 0], lineWidth: 2 },
            });

            doc.addPage();
        }

        for (const table of this.answersData) {
            let category = table.category;
            let questions = table.questions;
            let categoryName = this.getLocalizedCategory(category);

            doc.autoTable({
                head: this.getHeadRowsForTables(),
                body: this.getBodyRowsForTables(questions),
                styles: { halign: 'center', fillColor: [235, 235, 235], textColor: [0, 0, 0], lineWidth: 2 },
                willDrawPage: function (data) {
                    doc.setFillColor(173, 216, 230);
                    doc.rect(data.settings.margin.left, 20, docWidth - data.settings.margin.left * 2, 30, 'F');

                    doc.setTextColor(0, 0, 128);
                    doc.text(categoryName, data.settings.margin.left + 15, 40);
                },
                didParseCell: function (data) {
                    self.colorCell(data, 2);
                },
                margin: { top: 60 },
            })

            doc.addPage();
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
