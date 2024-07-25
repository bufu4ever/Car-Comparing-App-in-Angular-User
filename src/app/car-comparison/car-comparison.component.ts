import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../car.service';
import { Car } from '../Car';

@Component({
  selector: 'app-car-comparison',
  templateUrl: './car-comparison.component.html',
  styleUrls: ['./car-comparison.component.css']
})
export class CarComparisonComponent implements OnInit {
  selectedCars: Car[] = [];

  constructor(private carService: CarService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const carIds: string[] = params['cars'] ? params['cars'].split(',') : [];
      this.selectedCars = [];
      carIds.forEach(id => {
        this.carService.getCar(id).subscribe(car => {
          if (car && !this.selectedCars.some(c => c.id === car.id)) {
            this.selectedCars.push(car);
          }
        });
      });
    });
  }
  goBack(): void {
    localStorage.removeItem('selectedCarIds');
    this.router.navigate(['/list-of-cars']); 
  }
}
