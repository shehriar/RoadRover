import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchCarComponent } from './search_car/search_car.component';
import { AboutComponent } from './about/about.component';
import { AllCarsComponent } from './all_cars/all_cars.component';
import { SelectedCarComponent } from './selected_car/selected_car.component';
import { BookingComponent } from './booking/booking/booking.component';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation/booking-confirmation.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'app', component: AppComponent },
  { path: 'all_cars', component: AllCarsComponent},
  { path: 'vehicle_select', component: SelectedCarComponent},
  { path: 'booking', component: BookingComponent},
  { path: 'booking-confirmation', component: BookingConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
