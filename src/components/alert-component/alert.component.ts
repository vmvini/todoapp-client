import { Component } from '@angular/core';
import { AlertService } from 'src/services/alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

    public isVisible = false;

    public currentMessage = '';

    constructor(private alertService: AlertService) {
        this.alertService.messages$.subscribe((msg) => {
            this.isVisible = true;
            this.currentMessage = msg;
        });
    }

    public close() {
        this.isVisible = false;
        this.currentMessage = '';
    }
}
