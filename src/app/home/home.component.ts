import { HttpService } from './../shared/services/http-service';
import { Component, OnInit, EventEmitter, Output, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserValidationError } from '../shared/error/ErrorType';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { AjaxConstant } from '../shared/constants/AjaxConstant';
import { AuthenticationErrorMessageConstant, Message } from '../shared/constants/MessageConstants';
declare var require: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() verified = new EventEmitter<any>();
  public uiForm: FormGroup;
  public error: boolean = false;
  public errorMessage: String = '';
  public isUserIDEntered: boolean = false;
  public ajaxSource = new BehaviorSubject<any>(0);
  public ajaxSource$;
  public ajaxSubscription: Subscription;
  public isRequesting: boolean = false;
  public version: string = '';

  constructor(private service: HttpService, private router: Router,
    private formBuilder: FormBuilder, private httpService: HttpService, private zone: NgZone) {

    this.version = require('../../../package.json').version;
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
      employeeId: [{ value: '', disabled: false }]
    });
  }
  public activateButton(): void {
    if (this.uiForm.controls['employeeId'].value) {
      this.isUserIDEntered = true;
    } else {
      this.isUserIDEntered = false;
    }
  }

  public clickUpdate(): void {
    this.ajaxSource.next(AjaxConstant.START);
    this.httpService.checkEmployeeId(this.uiForm.controls['employeeId'].value).subscribe(
      data => {
        this.ajaxSource.next(AjaxConstant.COMPLETE);
        if (data && data.returnCode === '00') {
          this.verified.emit();
        } else {
          if (data && data.returnCode === '02') {
            this.handleError(UserValidationError.INVALID_CLOCK_IN);
          } else {
            this.handleError(UserValidationError.INVALID_USER);
          }
        }
      },
      error => {
        this.ajaxSource.next(AjaxConstant.COMPLETE);
        this.handleError(UserValidationError.GENERIC);
      }
    );
  }

  public handleError(error: UserValidationError): void {
    switch (error) {
      case UserValidationError.INVALID_USER:
        this.errorMessage = AuthenticationErrorMessageConstant.INVALID_USER;
        break;
      case UserValidationError.INVALID_CLOCK_IN:
        this.errorMessage = AuthenticationErrorMessageConstant.INVALID_CLOCK_IN;
        break;
      default:
        this.errorMessage = Message.GENERIC;
    }
    setTimeout(() => { this.error = true; }, 0);
  }

}
