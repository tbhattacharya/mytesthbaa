import { ModalComponent } from './../shared/components/modal/modal';
import { GeneralEnquiries } from './../model/enquiry';
import { Location } from './../model/location';
import { HttpService } from './../shared/services/http-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, HostListener, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Article } from '../model/article';
import { ErrorType, ServerError } from '../shared/error/ErrorType';
import { Constant } from '../shared/constants/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itemscananddetail',
  templateUrl: './itemscananddetail.component.html'
})
export class ItemscananddetailComponent implements OnInit, AfterViewInit {

  @ViewChild('employeeID') employeeID: ModalComponent;
  @ViewChild('barcode') barcode: ModalComponent;
  @ViewChild('itemNumber') itemNumber: ElementRef;
  public isShowingDetails: boolean = false;
  public uiForm: FormGroup;
  public article: Article;
  public locations: Array<Location>;
  public product: GeneralEnquiries;
  public error: boolean = false;
  public errorMessage: String = '';
  public barcodeState: boolean = false;

  constructor(private formBuilder: FormBuilder, private httpService: HttpService,
    private sStorage: SessionStorageService, private router: Router) { }

  ngOnInit() {
    this.uiForm = this.formBuilder.group({
      itemnumber: [{ value: '', disabled: false }, [Validators.pattern('^[A-Za-z0-9]{4,6}$'), Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    if (!this.sStorage.retrieve(Constant.USER_VERFIED_FOR_SESSION) || this.sStorage.retrieve(Constant.USER_VERFIED_FOR_SESSION) === false) {
      this.employeeID.show({ msg: 'Hello' });
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.error = false;
  }

  public onIDVerified(): void {
    this.sStorage.store(Constant.USER_VERFIED_FOR_SESSION, true);
    this.employeeID.hide();
  }

  public submit(): void {
    this.isShowingDetails = false;
    this.itemNumber.nativeElement.blur();
    if (!this.getFromSessionStorage()) {
      this.handleError(ErrorType.INVALID_STORE_NO);
      return;
    }
    if (this.uiForm.valid) {
      this.httpService.fetchDataForItem(this.uiForm.controls['itemnumber'].value, this.getFromSessionStorage()).subscribe(
        data => {
          if (data) {
            console.log('DATA ', data);
            this.article = data['GeneralEnquiries'].Article;
            this.locations = data['GeneralEnquiries'].Locations;
            this.isShowingDetails = true;
          }
        },
        error => {
          if (error && error.error && error.error.Error) {
            if (error.error.Error.Status === ServerError.INVALID_SITE) {
              this.handleError(ErrorType.STORE_NO_NOT_FOUND);
            } else if (error.error.Error.Status === ServerError.INVALID_ARTICLE) {
              this.handleError(ErrorType.ITEM_NO_NOT_FOUND);
            } else {
              this.handleError(ErrorType.GENERIC);
            }
          } else {
            this.handleError(ErrorType.GENERIC);
          }
        });
      /*let data = this.httpService.fetchDataForItem(this.uiForm.controls['itemnumber'].value, this.getFromSessionStorage());
      this.article = data.Article;
      this.locations = data.Locations;
      console.log(' DATA ', this.article, this.locations);*/
    } else {
      this.handleError(ErrorType.INVALID_ITEM_NO);
    }
  }

  public handleError(error: ErrorType) {
    switch (error) {
      case ErrorType.INVALID_ITEM_NO:
        this.errorMessage = 'Invalid Item No (must be 4-6 difit long)';
        break;
      case ErrorType.ITEM_NO_NOT_FOUND:
        this.errorMessage = 'Item number entered not found';
        break;
      case ErrorType.STORE_NO_NOT_FOUND:
        this.errorMessage = 'Store number entered not found';
        break;
      case ErrorType.INVALID_HEADERS:
        this.errorMessage = 'Headers are currently not supported';
        break;
      case ErrorType.ITEM_NOT_IN_STORE:
        this.errorMessage = 'Item not available at this store';
        break;
      case ErrorType.INVALID_STORE_NO:
        this.errorMessage = 'Invalid or no store number enetered';
        break;
      default:
        this.errorMessage = 'General Error. Please try again later';
    }
    setTimeout(() => { this.error = true; }, 0);
  }

  public getFromSessionStorage(): string {
    return this.sStorage.retrieve(Constant.STOTE_ID_FOR_SESSION);
  }

  public launchBarcodeScanner(): void {
    // this.router.navigate(['application/barcode']);
    this.barcodeState = true;
    this.barcode.show({});
  }

  public barcodeDetected(data: any): void {
    this.barcodeState = false;
    this.barcode.hide();
    this.uiForm.controls['itemnumber'].setValue(data);
    this.submit();
  }

}
