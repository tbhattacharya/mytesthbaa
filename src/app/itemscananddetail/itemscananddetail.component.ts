import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-itemscananddetail',
  templateUrl: './itemscananddetail.component.html'
})
export class ItemscananddetailComponent implements OnInit {

  public isShowingDetails: boolean = true;
  public uiForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.uiForm = this.formBuilder.group({
      itemnumber: [{ value: '', disabled: false }]
    });
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('KEY',  event.key);
  }

  public submit(): void {
    console.log(' SUBMIT');
  }

}
