export class Result {
    constructor(
        public message: string = '',
        public success: boolean = false,
        public data: any = null
    ) {
    }
}