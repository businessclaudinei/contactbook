export class User {
    constructor(
        public id: string = '',
        public name: string = '',
        public email: string = '',
        public password: string = '',
        public token: string = '',
        public image: string = '',
        public roles: string = ''
    ) {
    }
}