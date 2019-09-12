export class UserUtil {
    static get(): any {
        const data = localStorage.getItem('contactbook.user');
        if (!data) return null;
        return JSON.parse(data);
    }
    static set(data: any): any {
        localStorage.setItem('contactbook.user', JSON.stringify(data));
    }
    static clear(): any {
        localStorage.removeItem('contactbook.user');
    }

}