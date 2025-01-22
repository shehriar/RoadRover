import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LocationService } from '../services/location.service';
import { Vehicle } from '../interfaces/vehicle.interface';
import { VehicleFiltersComponent } from '../vehicle_filters/vehicle_filters.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { VehicleSelectionService } from '../services/vehicle_select.service'


@Component({
  selector: 'app-all-cars',
  templateUrl: './all_cars.component.html',
  styleUrls: ['./all_cars.component.css']
})

export class AllCarsComponent implements OnInit{
    title = 'Autocomplete Search';
    pickupCitySelected!: string;
    allVehicleModels!: Vehicle[];
    allVehiclesFromPickupCity!: Vehicle[];
    filteredVehicles!: Vehicle[];
    pickupCitySet : boolean = false;
    dropoffCity!: string;

    currentTypeFilter: string = '';
    currentFuelTypeFilter: string = '';
    currentMakeFilter: string[] = [];
    constructor(private apiService: ApiService, private locationService: LocationService, private router : Router, private vehicleSelect : VehicleSelectionService){
      this.locationService.getPickupLocationObservable().subscribe(location => {
        this.pickupCitySelected = location.split(',')[0]; // Adjust if your format is different
      });
    };

    

    ngOnInit() {
        // this.dropoffCity = this.locationService.getDropoffCity();
        // this.pickupCitySet = this.locationService.getLocationSet();
        this.fetchAllVehicles();
        this.locationService.getPickupLocationObservable().subscribe(location => {
          this.pickupCitySelected = location.split(',')[0]; // Adjust if your format is different
          this.applyFilters();
        });
        // this.fetchAllVehicleDataFromPickupLocation();
    }

    clickVehicle(vehicle : Vehicle, path : string){
      this.vehicleSelect.setSelectedVehicle(vehicle);
      this.router.navigateByUrl(path);
    }

    filterVehiclesByType(selectedType: string): void {
      this.currentTypeFilter = selectedType;
      this.applyFilters();
    }

    filterVehiclesByFuelType(selectedFuelType : string): void{
      this.currentFuelTypeFilter = selectedFuelType;
      this.applyFilters();
    }

    filterVehiclesByMake(selectedMakes: string[]): void{
      // console.log('Selected makes:', selectedMakes);
      this.currentMakeFilter = selectedMakes;
      this.applyFilters();
    }

    filterVehiclesByLocation(){
      if(this.pickupCitySet){
        // console.log(this.pickupCitySet)
        this.applyFilters();
      }
    }

    fetchAllVehicleDataFromPickupLocation(){
      // console.log(this.pickupCitySelected);
      this.apiService.getVehicleDataFromPickupLocation(this.pickupCitySelected).subscribe({
        next: (response) => {
          // console.log('Received data:', Object.values(response)[0]);
          this.allVehiclesFromPickupCity = Object.values(response)[0] as Vehicle[];
        },
        error: err => {
          console.error('Error getting vehicle data from pickup location:', err);
        }
      })
    }

    fetchAllVehicles(){
      this.apiService.getAllCarModels().subscribe({
        next: (response) => {
          // console.log('Received data:', Object.values(response)[0]);
          this.allVehicleModels = Object.values(response)[0] as Vehicle[];
          this.filteredVehicles = this.allVehicleModels;
          this.applyFilters();
          // this.allCarModels = response.vehicle_models.map((cars: any) => `${cars.vehiclemodel}`);
        },
        error: (err) => {
          console.error('Error fetching locations:', err);
        }
      })
    }

    applyFilters(): void {
      this.filteredVehicles = this.allVehicleModels;

      if (this.currentTypeFilter) {
        this.filteredVehicles = this.filteredVehicles.filter(vehicle => vehicle.vehicletype === this.currentTypeFilter);
      }

      if (this.currentFuelTypeFilter) {
        this.filteredVehicles = this.filteredVehicles.filter(vehicle => vehicle.fuelType === this.currentFuelTypeFilter);
      }

      if (this.currentMakeFilter.length > 0) {
        this.filteredVehicles = this.filteredVehicles.filter(vehicle => this.currentMakeFilter.includes(vehicle.vehiclemake));
      }

      if(this.pickupCitySelected && this.pickupCitySelected != "All Vehicles"){
        console.log(this.pickupCitySelected);
        this.filteredVehicles = this.filteredVehicles.filter(vehicle => vehicle.locationcity === this.pickupCitySelected);
      }
    }
}