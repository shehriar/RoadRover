import { Component, ElementRef, ViewChild } from '@angular/core';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent{
  title = 'Contact';

  @ViewChild('contactComponent', { static: false }) contactComponent!: ElementRef;

  constructor(private scrollService: ScrollService) {}

  ngOnInit() {
    this.scrollService.scrollToContactObservable.subscribe(() => {
      this.contactComponent.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
}
