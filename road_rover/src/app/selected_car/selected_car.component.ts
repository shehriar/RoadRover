import { Component, ViewChild } from '@angular/core';
import { Vehicle } from '../interfaces/vehicle.interface';
import { VehicleSelectionService } from '../services/vehicle_select.service';
import { DateRangeService } from '../services/date-range.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selected-car',
  templateUrl: './selected_car.component.html',
  styleUrls: ['./selected_car.component.css']
})
export class SelectedCarComponent{
    title = 'Selected Car';
    selectedCar! : Vehicle;
    selectedDateRange : any;
    reviewLabel:any;
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
      if(this.selectedCar.reviewCount > 1){
        this.reviewLabel = "Reviews";
      } else{
        this.reviewLabel = "Review"
      }
      console.log(this.selectedDateRange);
    }

    setVehicle(vehicle : Vehicle){
        this.selectedCar = vehicle;
    }

    clickButton(path : string){
      this.router.navigateByUrl(path);
    }
}