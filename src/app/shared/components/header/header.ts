import { SessionStorageService } from 'ng2-webstorage';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: 'header.html'
})

export class HeaderComponent implements OnInit {
    public storeId: string = '';
    private STORE: string = 'STORE';
    public isCollapsed = true;

    constructor(private sStorage: SessionStorageService) {
    }
    ngOnInit(): void {
        this.getFromSessionStorage();
    }

    public updateStoreID(): void {
        this.saveToSessionStorage();
        this.isCollapsed = !this.isCollapsed;
    }

    public saveToSessionStorage(): void {
        this.sStorage.store(this.STORE, this.storeId);
    }

    public getFromSessionStorage(): void {
        this.storeId = this.sStorage.retrieve(this.STORE);
    }

    public collapsed(event: any): void {
        console.log(event);
    }

    public expanded(event: any): void {
        console.log(event);
    }
}
