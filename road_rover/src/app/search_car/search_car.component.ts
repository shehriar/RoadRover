import { Component, ElementRef, ViewChild, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router'; 
import { ScrollService } from '../services/scroll.service';
import { LocationService } from '../services/location.service';
import { DatePickerComponent } from '../date_picker/date_picker.component';
import { DateRangeService } from '../services/date-range.service';

@Component({
  selector: 'app-car-search',
  templateUrl: './search_car.component.html',
  styleUrls: ['./search_car.component.css']
})
export class SearchCarComponent{
  title = 'Search Car';
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  isDateError! : boolean;

  pickupCitySelected : string = "";
  @Output() selectedLocation = new EventEmitter<string>();

  @ViewChild('searchCarComponent', { static: false }) searchCarComponent!: ElementRef;

  @ViewChild(DatePickerComponent, { static: false }) datePickerComponent!: DatePickerComponent;
  selectedDateRange : any;
  currentDate = new Date();

  constructor(private scrollService: ScrollService, private router: Router, private locationService : LocationService, private dateRangeService : DateRangeService) {}

  ngOnInit() {
    this.scrollService.scrollToCarSearchObservable.subscribe(() => {
      this.searchCarComponent.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    this.locationService.getPickupLocationObservable().subscribe(location => {
      this.pickupCitySelected = location.split(',')[0];
    });
  }

  clickButton(path: string) {
    this.datePickerComponent.extractDates();
    if(!this.dateErrors()){
      this.router.navigateByUrl(path);
    }
  }

  dateErrors() : boolean{
    this.isDateError = true;
    this.dateRangeService.dateSelected.subscribe(date =>{
        this.selectedDateRange = date;
    })
    var dateSelectedVar = new Date(this.selectedDateRange.start);

    if(this.currentDate <= dateSelectedVar){
      this.isDateError = false;
      return this.isDateError;
    }
    return this.isDateError;
  }
}
