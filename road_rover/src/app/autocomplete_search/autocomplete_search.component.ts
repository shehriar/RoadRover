import { Component, Input, EventEmitter, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { LocationService } from '../services/location.service';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';


@Component({
  selector: 'app-autocomplete-search',
  templateUrl: './autocomplete_search.component.html',
  styleUrls: ['./autocomplete_search.component.css']
})
export class AutocompleteSearchComponent implements OnInit{
  title = 'Autocomplete Search';
  pickupLocationForm!: FormGroup;
  pickupLocation!: FormControl;
  filteredOptions!: Observable<string[]>;
  @Input() label:string = '';
  @Input() locationType!: 'pickup' | 'dropoff';
  @Output() selectedLocation = new EventEmitter<string>();
  allLocations!: string[];

  constructor(private apiService: ApiService, private locationService: LocationService){};

  ngOnInit() {
    this.pickupLocation = new FormControl();
    this.pickupLocationForm = new FormGroup({
      pickupLocation: this.pickupLocation
    });

    this.filteredOptions = this.pickupLocation.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    const currentLocation = this.locationService.getCurrentPickupLocation();
    if (currentLocation) {
      this.pickupLocation.setValue(currentLocation);
    }

    this.apiService.getLocations().subscribe({
      next: (response) => {
        this.allLocations = response.locations.map((loc: any) => `${loc.locationcity}, ${loc.locationstate}`);
        this.filteredOptions = this.pickupLocation.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      },
      error: (err) => {
        console.error('Error fetching locations:', err);
      }
    });
  }

  updateValue(value: string){
    if(value){
      if(this.locationType == 'pickup'){
        console.log(value)
        this.locationService.setPickupLocation(value);
      }
      else{
        this.locationService.setDropoffLocation(value)
      }
      
      this.selectedLocation.emit(value);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.updateValue(value);
    return this.allLocations.filter(option => option.toLowerCase().includes(filterValue));
  }
}
