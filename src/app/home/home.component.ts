import { HttpService } from './../shared/services/http-service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private isCaptchaOk: boolean = false;

  constructor(private service: HttpService, private router: Router) { }

  ngOnInit() {
  }
  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.isCaptchaOk = true;
    this.service.checkCaptcha(captchaResponse).subscribe((data) => {
      console.log(' Auth ', data);
      this.isCaptchaOk = true;
    });
  }

  public clickUpdate(): void {
    console.log('Clicked');
    this.router.navigate(['application/items'], {});
  }

}
