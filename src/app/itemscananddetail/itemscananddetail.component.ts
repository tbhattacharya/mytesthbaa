import { BarcodeComponent } from './../barcode/barcode.component';
import { ModalComponent } from './../shared/components/modal/modal';
import { GeneralEnquiries } from './../model/enquiry';
import { Location } from './../model/location';
import { HttpService } from './../shared/services/http-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, HostListener, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Article } from '../model/article';
import { ErrorType, ServerError } from '../shared/error/ErrorType';
import { Constant } from '../shared/constants/constants';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { AjaxConstant } from '../shared/constants/AjaxConstant';
import { Message } from '../shared/constants/MessageConstants';

@Component({
  selector: 'app-itemscananddetail',
  templateUrl: './itemscananddetail.component.html'
})
export class ItemscananddetailComponent implements OnInit, AfterViewInit {

  @ViewChild('employeeID') employeeID: ModalComponent;
  @ViewChild('barcode') barcode: ModalComponent;
  @ViewChild('itemNumber') itemNumber: ElementRef;
  @ViewChild('quaggaComp') quaggaComp: BarcodeComponent;
  public isShowingDetails: boolean = false;
  public uiForm: FormGroup;
  public article: Article;
  public locations: Array<Location>;
  public product: GeneralEnquiries;
  public error: boolean = false;
  public errorMessage: String = '';
  public barcodeState: boolean = false;
  public ajaxSource = new BehaviorSubject<any>(0);
  public ajaxSource$;
  public ajaxSubscription: Subscription;
  public isRequesting: boolean = false;

  constructor(private formBuilder: FormBuilder, private httpService: HttpService,
    private sStorage: SessionStorageService, private router: Router, private zone: NgZone) {
    this.ajaxSource$ = this.ajaxSource.asObservable();
    this.ajaxSubscription = this.ajaxSource$.subscribe(event => {
      if (event !== 0) {
        this.zone.run(() => {
          switch (event) {
            case AjaxConstant.START:
              this.isRequesting = true;
              break;
            case AjaxConstant.COMPLETE:
              this.isRequesting = false;
              break;
          }
        });
      }
    });
  }

  ngOnInit() {
    this.uiForm = this.formBuilder.group({
      itemnumber: [{ value: '', disabled: false }, [Validators.pattern('^[A-Za-z0-9]+$')]]
    });
  }

  ngAfterViewInit(): void {
    if (!this.sStorage.retrieve(Constant.USER_VERFIED_FOR_SESSION) || this.sStorage.retrieve(Constant.USER_VERFIED_FOR_SESSION) === false) {
      this.employeeID.show({});
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
      this.handleError(ServerError.INVALID_STORE_NO);
      return;
    }
    if (this.uiForm.valid && this.fielsHasValue('itemnumber')) {
      this.ajaxSource.next(AjaxConstant.START);
      this.httpService.fetchDataForItem(this.uiForm.controls['itemnumber'].value, this.getFromSessionStorage())
        .subscribe(
          data => {
            this.ajaxSource.next(AjaxConstant.COMPLETE);
            if (data && data['GeneralEnquiries'].ReturnCode === '00') {
              this.article = data['GeneralEnquiries'].Article;
              this.locations = data['GeneralEnquiries'].Locations;
              this.isShowingDetails = true;
            } else if (data) {
              this.handleError(data['GeneralEnquiries'].ReturnCode);
            } else {
              this.handleError(ErrorType.GENERIC);
            }
          },
          error => {
            this.ajaxSource.next(AjaxConstant.COMPLETE);
            this.handleError(ErrorType.GENERIC);
          });
    } else {
      this.handleError(ErrorType.GENERIC);
    }
  }

  public handleError(error: ErrorType) {
    console.log('Called error ', error);
    switch (error) {
      case ServerError.INVALID_ITEM_NO:
        this.errorMessage = 'Invalid Item No';
        break;
      case ServerError.INVALID_ARTICLE:
        this.errorMessage = 'Item number entered not found';
        break;
      case ServerError.INVALID_SITE:
        this.errorMessage = 'Store number entered not found';
        break;
      case ServerError.ARTICLE_NOT_LISTED:
        this.errorMessage = 'Item not available at this store';
        break;
      case ServerError.NOT_HOMEBASE:
        this.errorMessage = 'Bunnings stores are not supported';
        break;
      case ServerError.STORE_CLOSED:
        this.errorMessage = 'Store not open (use from 07:00-22:00)';
        break;
      case ServerError.INVALID_STORE_NO:
        this.errorMessage = 'Invalid or no store number enetered';
        break;
      default:
        this.errorMessage = Message.GENERIC;
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

  public fielsHasValue(field: string): boolean {
    const val = this.uiForm.controls[field].value;
    if (val !== null && val !== undefined && val !== '') {
      return true;
    }
    return false;
  }

  public modalClose(): void {
    //this.quaggaComp.stopCamera();
  }

}
