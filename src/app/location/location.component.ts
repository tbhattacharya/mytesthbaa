import { Location } from './../model/location';
import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html'
})
export class LocationComponent implements OnInit, OnChanges {

  @Output() closeLocation = new EventEmitter();
  @Input() location: Location;
  public layoutArea: string;
  public meter: String;
  public shelf: String;
  public sequence: String;
  public locStringDisplay: String;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    console.log('Locations ', this.location);
    if (this.location) {
      const locString = this.location.LocationCode.toString();
      this.locStringDisplay = locString;
      const loc = locString.toString().split('-');
      this.layoutArea = loc[0];
      this.sequence = loc[2];
      this.meter = loc[1].substr(0, 2);
      this.shelf = loc[1].substr(2, 2);
    }

  }

  public close(): void {
    this.closeLocation.emit();
  }
}
