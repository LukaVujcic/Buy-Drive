import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoggedUsersService } from './logged-users.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  
  private cars: Car[] = [];
  private readonly url = 'http://localhost:8080';

  constructor(private http: HttpClient, private loggedUser: LoggedUsersService) {
  }

  public authHeader(){
    let t : number = this.loggedUser.get_token();
    return {
      headers: new HttpHeaders()
        .set('Authorization',  `${t}`)
    }
  }

  public addToFavorites(car: Car){
    let header = this.authHeader();
    let user : string = this.loggedUser.get_userId();
    let data = {carId: car.id, userId: user};
    this.cars.push(car);
    return this.http.post(this.url + "/add_favourite", data, header);
  }

  public deleteFromFavorites(car: Car){
    const index = this.cars.indexOf(car, 0);
    if (index > -1) {
       this.cars.splice(index, 1);
    }
  }

  public getFavorites(): Car[]{
    return this.cars;
  }
}
