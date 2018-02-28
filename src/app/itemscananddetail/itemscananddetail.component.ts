import { ModalComponent } from './../shared/components/modal/modal';
import { GeneralEnquiries } from './../model/enquiry';
import { Location } from './../model/location';
import { HttpService } from './../shared/services/http-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, HostListener, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SessionStorageService } from 'ng2-webstorage';
import { Article } from '../model/article';

@Component({
  selector: 'app-itemscananddetail',
  templateUrl: './itemscananddetail.component.html'
})
export class ItemscananddetailComponent implements OnInit, AfterViewInit {

  @ViewChild('captcha') captcha: ModalComponent;
  @ViewChild('itemNumber') itemNumber: ElementRef;
  public isShowingDetails: boolean = false;
  public uiForm: FormGroup;
  public article: Article;
  public locations: Array<Location>;
  public product: GeneralEnquiries;
  public CAPTHA: string = 'CAPTHA';

  constructor(private formBuilder: FormBuilder, private httpService: HttpService,
    private sStorage: SessionStorageService) { }

  ngOnInit() {
    this.uiForm = this.formBuilder.group({
      itemnumber: [{ value: '', disabled: false }, [Validators.pattern('^[A-Za-z0-9]{4,6}$'), Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    if (!this.sStorage.retrieve(this.CAPTHA) || this.sStorage.retrieve(this.CAPTHA) === false) {
      this.captcha.show({ msg: 'Hello' });
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('KEY', event.key);
  }

  public onAccept(): void {
    this.sStorage.store(this.CAPTHA, true);
    this.captcha.hide();
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
      this.itemNumber.nativeElement.blur();
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
