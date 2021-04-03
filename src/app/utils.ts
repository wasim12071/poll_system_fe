import { NgModule } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { environment } from 'src/environments/environment';
declare const mApp: any;

@NgModule()
export class Utils {

    /**
     * Show error messages only on dev env whenever occured.
     * @param text string
     * @param error obj
     */
    public static showErrorMessage(text: string, error: any): void {
        if (!environment.production) {
            console.log(text, error);
        }
    }

    /**
     * Show loader on entire page
     */
    public static blockPage(): void {
        mApp.blockPage();
    }

    /**
     * Hide loader from the page
     */
    public static unblockPage(): void {
        mApp.unblockPage();
    }

    /**
     * Show loader on an element
     * @param element element selector e.g. #div-id
     */
    public static showLoader(element: string): void {
        mApp.showLoader(element);
    }

    /**
     * Hide loader on an element
     * @param element element selector e.g. #div-id
     */
    public static hideLoader(element: string): void {
        mApp.hideLoader(element);
    }

    /**
     * Convert a selected div into a pdf
     * @param element element selector e.g. #div-id
     * @param fileName string e.g. new_file
     * @param orientation ENUM String [ 'p', 'l' ] e.g. 'p'
     */
     public static async printContainer(element: string, fileName: string = 'new_file', orientation: any = 'p'): Promise<void> {
        const data = document.getElementById(element);
        await html2canvas(data).then(canvas => {
            const imgWidth = 208;
            const pdf = new jspdf( orientation , 'mm', 'a4');
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, canvas.height * imgWidth / canvas.width);
            pdf.save(`${fileName}.pdf`);
        });
    }
}
