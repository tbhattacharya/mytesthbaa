import { MOCK } from './../model/mock';
import { GeneralEnquiries } from './../model/enquiry';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itemdetails',
  templateUrl: './itemdetails.component.html'
})
export class ItemDetailsComponent implements OnInit {

public product: GeneralEnquiries;

  constructor() {
      this.product = JSON.parse(MOCK).GeneralEnquiries;
      console.log(this.product);
  }

  ngOnInit() {
  }

}