export class Response {
    constructor(
        public message: string = '',
        public success: boolean = false,
        public data: any = null
    ) {
    }
}