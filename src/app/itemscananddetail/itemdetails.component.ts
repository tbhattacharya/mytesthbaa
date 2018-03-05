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

  constructor() {
  }

  ngOnInit() {

  }
  public ngOnChanges(data: any): void {
    this.populateUI();
  }

  public populateUI(): void {
    console.log('CALLED ', this.locations, this.article);
  }

  public onLocationRecordClicked(index: number): void {
    this.locationData = this.locations[index];
    this.location.show({});
  }

  public closeLocation(): void {
    this.location.hide();
  }
}
