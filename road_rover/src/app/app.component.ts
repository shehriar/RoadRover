import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ScrollService } from './services/scroll.service';
import { ApiService } from './services/api.service';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'car-renting';
  constructor(private router: Router, private scrollService: ScrollService, private apiService: ApiService) {}

  onHomeClick() {
    this.scrollService.scrollToHome();
  }

  onAboutClick(){
    this.scrollService.scrollToAbout();
  }

  onContactClick(){
    this.scrollService.scrollToContact();
  }
  onCarListClick(){
    this.scrollService.scrollToCarList();
  }

  clickButton(path: string) {
    this.router.navigateByUrl(path);
  } 
}
