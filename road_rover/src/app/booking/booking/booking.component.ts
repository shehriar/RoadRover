import { Component } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle.interface';
import { VehicleSelectionService } from 'src/app/services/vehicle_select.service';
import { DateRangeService } from 'src/app/services/date-range.service';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/interfaces/user-details.interface';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  title = 'Booking'

  selectedCar! : Vehicle;
  selectedDateRange : any;
  user! : UserDetails;
  startDate : any;
  endDate : any;
  numDaysBooked : any;
  bookingPrice : any;
  taxPrice : any;
  totalPrice : any;
  

  constructor(private selectedVehicle : VehicleSelectionService, private dateRangeService : DateRangeService, private router : Router) {}
  ngOnInit(){
    this.dateRangeService.dateSelected.subscribe(date =>{
      this.selectedDateRange = date;
    })
    this.selectedVehicle.selectedVehicle.subscribe(vehicle => {
      if (vehicle) {
        this.selectedCar = vehicle;
      }
    });
    this.calculateTotalPrice();
    console.log(this.bookingPrice, this.taxPrice, this.totalPrice);
  }

  calculateTotalPrice(){
    this.calculateBookingPrice();
    this.totalPrice = this.bookingPrice + this.taxPrice;
    this.totalPrice = (Math.round(this.totalPrice * 100)/100).toFixed(2)
    this.taxPrice = (Math.round(this.taxPrice * 100)/100).toFixed(2)
    this.bookingPrice = (Math.round(this.bookingPrice * 100)/100).toFixed(2)
    // this.totalPrice.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  }

  calculateBookingPrice(){
    this.calculateNumDates();
    this.bookingPrice = this.numDaysBooked * this.selectedCar.ratedaily;
    // this.bookingPrice.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    this.calculateTaxPrice();
    return this.bookingPrice
  }

  calculateTaxPrice(){
    this.taxPrice = this.bookingPrice * 0.11;
    // this.taxPrice.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    
    return this.taxPrice;
  }

  calculateNumDates(){
    this.startDate = this.selectedDateRange.start;
    this.endDate = this.selectedDateRange.end;

    this.startDate = new Date(this.startDate);
    this.endDate = new Date(this.endDate);

    var timeinmilisec = this.endDate.getTime() - this.startDate.getTime();
    this.numDaysBooked = Math.ceil(timeinmilisec / (1000 * 60 * 60 * 24));
    
    console.log( this.numDaysBooked );
    return this.numDaysBooked
  }

  clickButton(path : string){
    this.router.navigateByUrl(path);
  }

  test(user : any){
    console.log(user.value);
  }
} 
