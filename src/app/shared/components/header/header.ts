import { SessionStorageService } from 'ng2-webstorage';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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

    constructor(private sStorage: SessionStorageService, private formBuilder: FormBuilder) {
    }
    ngOnInit(): void {
        this.uiForm = this.formBuilder.group({
            storenumber: ['', [Validators.pattern('\d{3}')]]
        });
        if (this.getFromSessionStorage()) {
            this.storeMessage = 'Store ' + this.getFromSessionStorage();
        }
    }

    public updateStoreID(): void {
        if (this.uiForm.valid) {
            this.saveToSessionStorage();
            this.storeMessage = 'Store ' + this.getFromSessionStorage();
            this.isCollapsed = !this.isCollapsed;
        } else {
            alert('Error');
        }
    }

    public saveToSessionStorage(): void {
        this.sStorage.store(this.STORE, this.storeId);
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
