import { ErrorHandler } from "@angular/core";

export class MyErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        console.error(error.fileName, error.lineNumber, ':', error.columnNumber, '\n', error.message, error.rejection)
    }
}
