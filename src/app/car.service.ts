import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Car } from './Car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private firestore: AngularFirestore) { }


  getCars(): Observable<Car[]> {
    return this.firestore.collection<Car>('cars').valueChanges({ idField: 'id' });
  }
  getCar(id: string): Observable<Car | undefined> {
    const carDoc: AngularFirestoreDocument<Car> = this.firestore.doc<Car>(`cars/${id}`);
    return carDoc.valueChanges();
  }
  
}
