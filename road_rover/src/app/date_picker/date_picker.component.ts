import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { DateRangeService } from '../services/date-range.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date_picker.component.html',
  styleUrls: ['./date_picker.component.css']
})
export class DatePickerComponent{
  title = 'Search Car';
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private dateRangeService : DateRangeService){}

  extractDates() {
    const startDate = this.range.value.start ? this.range.value.start.toISOString() : null;
    const endDate = this.range.value.end ? this.range.value.end.toISOString() : null;

    const startDateFormat = this.range.value.start ? this.formatDate(this.range.value.start) : null;
    const endDateFormat = this.range.value.end ? this.formatDate(this.range.value.end) : null;

    const startDateErrorCheckingFormat = this.range.value.start ? this.formatDate(this.range.value.start) : null;
    const endDateErrorCheckingFormat = this.range.value.end ? this.formatDate(this.range.value.end) : null;

    this.dateRangeService.setDateRange({start: startDateFormat, end: endDateFormat});
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
  }

  private formatDateErrorChecking(date : Date) : string{
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
  }
}
