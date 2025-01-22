import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { HttpClientModule } from '@angular/common/http'; 


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchCarComponent } from './search_car/search_car.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutocompleteSearchComponent } from './autocomplete_search/autocomplete_search.component';
import { DatePickerComponent } from './date_picker/date_picker.component';
import { CarListComponent } from './car_list_on_home/car_list.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AllCarsComponent } from './all_cars/all_cars.component';
import { VehicleFiltersComponent } from './vehicle_filters/vehicle_filters.component';
import { SelectedCarComponent } from './selected_car/selected_car.component';
import { RatingsComponent } from './ratings/ratings.component';
import { BookingComponent } from './booking/booking/booking.component';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation/booking-confirmation.component';
import { OurTeamComponent } from './our_team/our_team.component';

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    SearchCarComponent,
    AutocompleteSearchComponent,
    DatePickerComponent,
    CarListComponent,
    AboutComponent,
    ContactComponent,
    AllCarsComponent,
    VehicleFiltersComponent,
    SelectedCarComponent,
    RatingsComponent,
    BookingComponent,
    BookingConfirmationComponent,
    OurTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
