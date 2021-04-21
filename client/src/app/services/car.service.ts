import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private cars!: Observable<Car[]>;
  private readonly url = 'http://localhost:8080/filter_cars';

  constructor(private http: HttpClient) { 
  }

  public getCars(filters: object): Observable<Car[]>{
    let query = "?=";
    for (const [key, value] of Object.entries(filters)){
      query += key + "=" + encodeURIComponent(value) + "&";
    }
    query = query.substring(0, query.length - 1);
    this.cars = this.http.get<Car[]>(this.url+query);
    return this.cars;
  }
}
