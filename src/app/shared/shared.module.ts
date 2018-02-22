import { ModalAdvComponent } from './components/modal-adv/modal-adv';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header';
import { SpinnerComponent } from './components/spinner/spinner';
import { HttpClientModule } from '@angular/common/http';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HeaderComponent,
        ModalAdvComponent,
        SpinnerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CollapseModule.forRoot(),
        RouterModule
    ],

    declarations: [
        HeaderComponent,
        ModalAdvComponent,
        SpinnerComponent
    ],

    entryComponents: [
    ]
})

export class SharedModule {
}
