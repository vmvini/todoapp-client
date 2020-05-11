import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AlertService {

    public messages$;
    private messages = new Subject();

    constructor() {
        this.messages$ = this.messages.asObservable();
    }

    public push(message: string) {
        this.messages.next(message);
    }

}