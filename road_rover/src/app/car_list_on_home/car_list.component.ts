import { Component, ElementRef, ViewChild} from '@angular/core';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car_list.component.html',
  styleUrls: ['./car_list.component.css']
})
export class CarListComponent {
  title = 'Car List';
  carTypes = [
    {type: "SUV", image: "assets/car_types/suv_image.png"},
    {type: "Sedan", image: "assets/car_types/sedan_image.png"},
    {type: "Truck", image: "assets/car_types/truck_image.png"},
    {type: "Minivan", image: "assets/car_types/minivan_image.png"},
    {type: "Van", image: "assets/car_types/van_image.png"},
  ];

  @ViewChild('carListComponent', { static: false }) carListComponent!: ElementRef;

  constructor(private scrollService: ScrollService) {}

  ngOnInit() {
    this.scrollService.scrollToCarListObservable.subscribe(() => {
      this.carListComponent.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
}