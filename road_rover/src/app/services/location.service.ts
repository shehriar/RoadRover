import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locationSet : boolean = false;
  private pickupLocation: string = '';
  private dropoffLocation: string = '';
  private pickupLocationSubject = new BehaviorSubject<string>('');

  private pickupCity: string = '';
  private pickupState: string = '';

  private dropoffCity: string = '';
  private dropoffState: string = '';

  getLocationSet(){
    return this.locationSet;
  }

  setPickupLocation(location: string) {
    console.log(location);
    this.pickupLocation = location;
    this.locationSet = true;
    this.pickupLocationSubject.next(location);
  }

  setDropoffLocation(location: string) {
    this.dropoffLocation = location;
  }

  getPickupLocation(): string {
    return this.pickupLocation;
  }

  getPickupLocationObservable() {
    return this.pickupLocationSubject.asObservable();
  }

  getCurrentPickupLocation(): string {
    return this.pickupLocationSubject.value;
  }

  getDropoffLocation(): string {
    return this.dropoffLocation;
  }

  getPickupCity(): string{
    this.pickupCity = this.pickupLocation.split(',')[0];
    return this.pickupCity;
  }

  getPickupState(): string{
    this.pickupState = this.pickupLocation.split(', ')[1];
    return this.pickupState;
  }

  getDropoffCity(): string{
    this.dropoffCity = this.dropoffLocation.split(',')[0];
    return this.dropoffCity;
  }

  getDropoffState(): string{
    this.dropoffCity = this.dropoffLocation.split(', ')[1];
    return this.dropoffState;
  }

}
