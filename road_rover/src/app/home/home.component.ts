import { Component, ElementRef, ViewChild} from '@angular/core';
import { ScrollService } from '../services/scroll.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Home';
  constructor(private router: Router, private scrollService: ScrollService) {}

  @ViewChild('homeComponent', { static: false }) homeComponent!: ElementRef;


  onBookARideClick() {
    this.scrollService.scrollToSearchCar();
  }

  ngOnInit() {
    this.scrollService.scrollToHomeObservable.subscribe(() => {
      this.homeComponent.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

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
}
