import PdfPrinter from 'pdfmake';
import blobStream, { type IBlobStream } from 'blob-stream';
import type { TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';
import path from "node:path";



const fonts: TFontDictionary = {
    Futura: {
        normal: `./static/fonts/FuturaPTBook.otf`,
        bold: `./static/fonts/FuturaPTBold.otf`
    }
};
const printer = new PdfPrinter(fonts);

async function genInvoicePdf(): Promise<Blob> {



    const file: TDocumentDefinitions = {

        pageMargins: [40, 40, 40, 60],
        content: [
            "Hello, World!!"
        ],
        defaultStyle: {
            font: 'Futura'
        }
    };

    return new Promise((resolve, reject) => {
        const pdf = printer.createPdfKitDocument(file);

        pdf
            .pipe(blobStream())
            .on('finish', function (this: IBlobStream) {
                console.log('Finished generating PDF');
                resolve(this.toBlob('application/pdf'));
            })
            .on('error', (err) => {
                console.error('err', err);
                reject(err);
            });

        pdf.end();
    });
}

export default genInvoicePdf;