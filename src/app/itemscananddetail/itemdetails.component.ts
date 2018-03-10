import { ModalComponent } from './../shared/components/modal/modal';
import { Location } from './../model/location';
import { MOCK } from './../model/mock';
import { GeneralEnquiries } from './../model/enquiry';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Article } from '../model/article';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

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
        this.stockQuantity = avStock + ' in stock';
        this.stockDisplay = 'available';
      } else if (avStock > 0) {
        this.stockQuantity = 'Only ' + avStock + ' in stock';
        this.stockDisplay = 'low';
      } else {
        this.stockQuantity = 'Out of stock';
        this.stockDisplay = 'empty';
      }

      const orStock = parseInt(this.article.StockOnOrder, 10);
      if (orStock > 2) {
        this.orderQuantity = orStock + ' on order';
        this.orderDisplay = 'available';
      } else if (orStock > 0) {
        this.orderQuantity = 'Only ' + orStock + ' on order';
        this.orderDisplay = 'low';
      } else {
        this.orderQuantity = 'None on order';
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

      this.price = '£' + this.article.CurrentPrice;
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
