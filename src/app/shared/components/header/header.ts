import { SessionStorageService } from 'ng2-webstorage';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-header',
    templateUrl: 'header.html'
})

export class HeaderComponent implements OnInit {
    public storeMessage: string = 'Select your store';
    public storeId: string = '';
    public STORE: string = 'STORE';
    public isCollapsed = true;
    public uiForm: FormGroup;
    @ViewChild('storeNumber')storeNumber: ElementRef;

    constructor(private sStorage: SessionStorageService, private formBuilder: FormBuilder) {
    }
    ngOnInit(): void {
        this.uiForm = this.formBuilder.group({
            storenumber: ['', [Validators.pattern('^[0-9]{3}$'), Validators.required]]
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
        this.sStorage.store(this.STORE, this.uiForm.controls['storenumber'].value);
        this.storeId = this.uiForm.controls['storenumber'].value;
    }

    public getFromSessionStorage(): string {
        this.storeId = this.sStorage.retrieve(this.STORE);
        return this.storeId;
    }

    public collapsed(event: any): void {
        console.log(event);
    }

    public expanded(event: any): void {
        console.log(event);
    }
}
