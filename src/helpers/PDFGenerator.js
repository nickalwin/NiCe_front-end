import { jsPDF } from "jspdf";
import i18n from '../i18n/index.js';
// import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';

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

        console.log(this.tableData);
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
                question: i18n.global.t('fields.question'),
                answer: i18n.global.t('fields.answer'),
                comment: i18n.global.t('fields.comment'),
            }
        ];
    }

    getLocalizedQuestion(question) {
        var data = JSON.parse(question.question_data);

        return data[i18n.global.locale] ?
            data[i18n.global.locale].question :
            data.en.question;
    }

    getLocalizedCategory(category) {
        var data = JSON.parse(category.category_data);

        return data[i18n.global.locale] ?
            data[i18n.global.locale].name :
            data.en.name;
    }

    getBodyRowsForTables(questions) {
        return questions.grouped_answers.map((question) => {
            return {
                question: this.getLocalizedQuestion(question),
                answer: question.answer,
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
                startY: tablePos,
                willDrawPage: function (data) {
                    doc.setFontSize(20)
                    doc.setTextColor(40)
                    doc.text(categoryName, data.settings.margin.left + 15, 40)
                },
                margin: { top: 60 },
            })

            tablePos += 1000;
        }

        window.open(doc.output('bloburl'), '_blank');
        // var timestamp = new Date().toISOString().slice(0, 10);
        // doc.save(timestamp + "_NiCE_Report.pdf");
    }
}

export default PDFGenerator;
