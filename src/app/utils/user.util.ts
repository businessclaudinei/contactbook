import { User } from '../models/user.model';

export class UserUtil {
    static get(): User {
        const user = localStorage.getItem('contactbook.user');
        if (!user) return null;
        return JSON.parse(user);
    }
    static set(user: User): any {
        localStorage.setItem('contactbook.user', JSON.stringify(user));
    }
    static clear() {
        localStorage.removeItem('contactbook.user');
    }

}