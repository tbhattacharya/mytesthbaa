import { SessionStorageService } from 'ngx-webstorage';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Constant } from '../../constants/constants';

@Component({
    selector: 'app-header',
    templateUrl: 'header.html'
})

export class HeaderComponent implements OnInit {
    public storeMessage: string = 'Select your store';
    public storeId: string = '';
    public isCollapsed = true;
    public uiForm: FormGroup;
    @ViewChild('storeNumber') storeNumber: ElementRef;

    constructor(private sStorage: SessionStorageService, private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.uiForm = this.formBuilder.group({
            storenumber: ['', [Validators.pattern('^[0-9]{3}$')]]
        });
        if (this.getFromSessionStorage()) {
            this.storeMessage = 'Store ' + this.getFromSessionStorage();
        }
    }

    public updateStoreID(): void {
        if (this.uiForm.valid) {
            this.storeNumber.nativeElement.blur();
            this.saveToSessionStorage();
            this.storeMessage = 'Store ' + this.uiForm.controls['storenumber'].value;
            this.isCollapsed = !this.isCollapsed;
        }
    }

    public saveToSessionStorage(): void {
        this.sStorage.store(Constant.STOTE_ID_FOR_SESSION, this.uiForm.controls['storenumber'].value);
        this.storeId = this.uiForm.controls['storenumber'].value;
    }

    public getFromSessionStorage(): string {
        this.storeId = this.sStorage.retrieve(Constant.STOTE_ID_FOR_SESSION);
        return this.storeId;
    }

    public collapsed(event: any): void {
        console.log(event);
    }

    public expanded(event: any): void {
        console.log(event);
    }
}
