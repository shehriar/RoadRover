import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollToCarSearchSource = new Subject<void>();
  scrollToCarSearchObservable = this.scrollToCarSearchSource.asObservable();

  scrollToSearchCar() {
    this.scrollToCarSearchSource.next();
  }

  private scrollToHomeSource = new Subject<void>();
  scrollToHomeObservable = this.scrollToHomeSource.asObservable();

  scrollToHome(){
    this.scrollToHomeSource.next();
  }
  
  private scrollToAboutSource = new Subject<void>();
  scrollToAboutObservable = this.scrollToAboutSource.asObservable();

  scrollToAbout(){
    this.scrollToAboutSource.next();
  }

  private scrollToContactSource = new Subject<void>();
  scrollToContactObservable = this.scrollToContactSource.asObservable();

  scrollToContact(){
    this.scrollToContactSource.next();
  }

  private scrollToCarListSource = new Subject<void>();
  scrollToCarListObservable = this.scrollToCarListSource.asObservable();

  scrollToCarList(){
    this.scrollToCarListSource.next();
  }

  constructor() { }
}
