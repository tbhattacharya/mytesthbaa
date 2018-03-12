import { ModalComponent } from './../shared/components/modal/modal';
import { Location } from './../model/location';
import { MOCK } from './../model/mock';
import { GeneralEnquiries } from './../model/enquiry';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Article } from '../model/article';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Constant } from '../shared/constants/constants';

@Component({
  selector: 'app-itemdetails',
  templateUrl: './itemdetails.component.html'
})
export class ItemDetailsComponent implements OnInit, OnChanges {

  @Input() locations: Array<Location>;
  @Input() article: Article;
  @ViewChild('location') location: ModalComponent;
  public locationData: Location;
  public stockQuantity: string = '';
  public orderQuantity: string = '';
  public status: string = '';
  public price: string = '';
  public stockDisplay: string = '';
  public orderDisplay: string = '';
  public statusDisplay: string = '';
  public priceColor: string = '';
  public showPromo: boolean = false;

  constructor() {
  }

  ngOnInit() {

  }
  public ngOnChanges(data: any): void {
    this.populateUI();
  }

  public populateUI(): void {
    if (this.article) {
      const avStock = parseInt(this.article.AvailableStock, 10);
      if (avStock > 2) {
        this.stockQuantity = avStock + ' available';
        this.stockDisplay = 'available';
      } else if (avStock > 0) {
        this.stockQuantity = 'only ' + avStock + ' available';
        this.stockDisplay = 'low';
      } else {
        this.stockQuantity = 'none available';
        this.stockDisplay = 'empty';
      }

      const orStock = parseInt(this.article.IncomingStock, 10);
      if (orStock > 2) {
        this.orderQuantity = orStock + ' on order';
        this.orderDisplay = 'available';
      } else if (orStock > 0) {
        this.orderQuantity = 'only ' + orStock + ' on order';
        this.orderDisplay = 'low';
      } else {
        this.orderQuantity = 'none on order';
        this.orderDisplay = 'empty';
      }

      if (this.article.SiteStatusCode === 'Z3') {
        this.status = 'Discontinued';
        this.statusDisplay = 'discontinued';
      } else if (this.article.SiteStatusCode === 'Z2') {
        this.status = 'Suspended';
        this.statusDisplay = 'suspended';
      } else {
        this.status = 'Available';
        this.statusDisplay = 'availableInStore';
      }

      // Price and promo
      if (this.article.OnPromotion === Constant.PROMO) {
        this.showPromo = true;
        this.priceColor = 'price-perunit-promo';
      } else {
        this.showPromo = false;
        this.priceColor = 'price-perunit-non-promo';
      }
      let currencyCode = '£';
      if (this.article.CurrencyCode === Constant.EUR) {
        currencyCode = '€';
      }
      this.price = currencyCode+ ' ' + this.article.CurrentPrice;
    }
  }

  public onLocationRecordClicked(index: number): void {
    this.locationData = this.locations[index];
    this.location.show({});
  }

  public closeLocation(): void {
    this.location.hide();
  }
}
