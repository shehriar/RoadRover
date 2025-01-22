import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LocationService } from './location.service';
import { environment } from '../environments/environment';
  
@Injectable({ 
    providedIn: 'root'
}) 
export class ApiService { 
    constructor(private http: HttpClient) { }
    getMessage() { 
        return this.http.get( 
            `${environment.apiBaseUrl}/api/message`); 
    } 
    getLocations():Observable<any>{
        return this.http.get(
            `${environment.apiBaseUrl}/api/locations`
        )
    }

    getAllCarModels():Observable<any>{
        return this.http.get(
            `${environment.apiBaseUrl}/api/vehicle_models`
        )
    }

    getVehicleDataFromPickupLocation(pickupLocation:string):Observable<any>{
        console.log(pickupLocation);
        return this.http.post(
            `${environment.apiBaseUrl}/api/vehicles_from_pickup_location`,
            { pickupLocation: pickupLocation }
        );
    }

    getVehicleTypes():Observable<any>{
        return this.http.get(
            `${environment.apiBaseUrl}/api/vehicle_types`
        )
    }

    getVehicleMakes():Observable<any>{
        return this.http.get(
            `${environment.apiBaseUrl}/api/vehicle_makes`
        )
    }

    getFuelTypes():Observable<any>{
        return this.http.get(
            `${environment.apiBaseUrl}/api/fuel_types`
        )
    }
}