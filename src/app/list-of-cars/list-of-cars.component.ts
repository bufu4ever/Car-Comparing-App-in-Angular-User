import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../car.service';
import { Car } from '../Car';

@Component({
  selector: 'app-list-of-cars',
  templateUrl: './list-of-cars.component.html',
  styleUrls: ['./list-of-cars.component.css']
})
export class ListOfCarsComponent implements OnInit {
  cars: Car[] = [];
  selectedCarIds: Set<string> = new Set();

  constructor(private carService: CarService, private router: Router) { }

  ngOnInit(): void {
    this.carService.getCars().subscribe(data => {
      this.cars = data;
      const storedSelectedCarIds = localStorage.getItem('selectedCarIds');
      if (storedSelectedCarIds) {
        this.selectedCarIds = new Set(JSON.parse(storedSelectedCarIds));
      }
    });
  }

  toggleSelection(car: Car): void {
    if (car.id) {
      if (this.selectedCarIds.has(car.id)) {
        this.selectedCarIds.delete(car.id);
      } else {
        this.selectedCarIds.add(car.id);
      }
      localStorage.setItem('selectedCarIds', JSON.stringify(Array.from(this.selectedCarIds)));
    }
  }

  goToComparison(): void {
    const selectedIds = Array.from(this.selectedCarIds);
    this.router.navigate(['/compare'], { queryParams: { cars: selectedIds.join(',') } });
  }

  resetSelections(): void {
    const storedSelectedCarIds = localStorage.getItem('selectedCarIds');
    if (storedSelectedCarIds) {
      localStorage.removeItem('selectedCarIds');  
      this.selectedCarIds = new Set();
    }
  }
}
