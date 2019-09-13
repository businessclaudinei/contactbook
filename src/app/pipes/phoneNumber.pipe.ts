import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phone' })
export class PhoneNumberPipe implements PipeTransform {
    transform(value: string, country?: string): string {
        let pre = '';
        switch (country) {
            case 'BR':
                pre = '+55';
                break;
            case 'US':
                pre = '+1';
                break;
            default:
                pre = '';
                break;
        }
        return pre + value;
    }
}