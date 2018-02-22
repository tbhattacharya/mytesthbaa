import { GeneralEnquiries } from './../model/enquiry';
import { Location } from './../model/location';
import { HttpService } from './../shared/services/http-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, HostListener } from '@angular/core';
import { SessionStorageService } from 'ng2-webstorage';
import { Article } from '../model/article';

@Component({
  selector: 'app-itemscananddetail',
  templateUrl: './itemscananddetail.component.html'
})
export class ItemscananddetailComponent implements OnInit {

  public isShowingDetails: boolean = false;
  public uiForm: FormGroup;
  public article: Article;
  public locations: Array<Location>;
  public product: GeneralEnquiries;

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private sStorage: SessionStorageService) { }

  ngOnInit() {
    this.uiForm = this.formBuilder.group({
      itemnumber: [{ value: '', disabled: false }]
    });
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('KEY', event.key);
  }

  public submit(): void {
    console.log(' SUBMIT');
    if (this.uiForm.valid) {
      /*this.httpService.fetchDataForItem(this.uiForm.controls['itemnumber'].value, this.getFromSessionStorage())
        .subscribe(
        (data) => {
          console.log('HERE');
          if (data) {
            this.article = data.Article;
            this.locations = data.Locations;
            this.isShowingDetails = true;
          }
        },
        error => {
          console.log('Err ', error);
        });*/
      let data = this.httpService.fetchDataForItem(this.uiForm.controls['itemnumber'].value, this.getFromSessionStorage());
      this.article = data.Article;
      this.locations = data.Locations;
      console.log(' DATA ', this.article, this.locations);
      this.isShowingDetails = true;
    } else {
      alert('Error');
    }
  }

  public getFromSessionStorage(): string {
    return this.sStorage.retrieve('STORE');
  }

}
