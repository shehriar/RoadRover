import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateRangeService {
  private dateRangeSource = new BehaviorSubject<{start: string | null, end: string | null}>({start: null, end: null});
  dateSelected = this.dateRangeSource.asObservable();

  private dateRangeErrorCheckingSource = new BehaviorSubject<{start: string | null, end: string | null}>({start: null, end: null});
  dateSelectedErrorChecking = this.dateRangeErrorCheckingSource.asObservable();
  constructor() { }

  setDateRange(dateRange: {start: string | null, end: string | null}): void {
    this.dateRangeSource.next(dateRange);
  }
  
  getDateRange(){
    return this.dateSelected;
  }
}