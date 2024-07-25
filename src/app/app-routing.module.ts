import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComparisonComponent } from './car-comparison/car-comparison.component';
import { ListOfCarsComponent } from './list-of-cars/list-of-cars.component';

const routes: Routes = [
  { path: '', redirectTo: '/list-of-cars', pathMatch: 'full' },
  { path: 'list-of-cars', component: ListOfCarsComponent },
  { path: 'compare', component: CarComparisonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
