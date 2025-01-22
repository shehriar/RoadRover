import { Component, ElementRef, ViewChild} from '@angular/core';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  title = 'About';
  constructor(private scrollService: ScrollService) {}

  @ViewChild('aboutComponent', { static: false }) aboutComponent!: ElementRef;

  ngOnInit() {
    this.scrollService.scrollToAboutObservable.subscribe(() => {
      this.aboutComponent.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
}