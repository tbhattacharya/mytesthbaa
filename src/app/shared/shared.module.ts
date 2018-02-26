import { ModalComponent } from './components/modal/modal';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header';
import { SpinnerComponent } from './components/spinner/spinner';
import { HttpClientModule } from '@angular/common/http';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule, ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HeaderComponent,
        SpinnerComponent,
        ModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CollapseModule.forRoot(),
        RouterModule,
        ModalModule.forRoot()
    ],

    declarations: [
        HeaderComponent,
        SpinnerComponent,
        ModalComponent
    ],

    entryComponents: [
        ModalComponent
    ]
})

export class SharedModule {
}
