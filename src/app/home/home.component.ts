import { HttpService } from './../shared/services/http-service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserValidationError } from '../shared/error/ErrorType';

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

  constructor(private service: HttpService, private router: Router,
    private formBuilder: FormBuilder, private httpService: HttpService) { }

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
    this.httpService.checkEmployeeId(this.uiForm.controls['employeeId'].value).subscribe(
      data => {
        if (data && data.allowed === true){
          this.verified.emit();
        } else {
          this.handleError(UserValidationError.INVALID_USER);
        }
      },
      error => {
        this.handleError(UserValidationError.GENERIC);
      }
    );
  }

  public handleError(error: UserValidationError): void {
    switch (error) {
      case UserValidationError.INVALID_USER:
        this.errorMessage = 'Invalid Employee ID';
        break;
      default:
        this.errorMessage = 'General Error. Please try again later';
    }
    setTimeout(()=>{this.error = true;}, 0);
  }

}
