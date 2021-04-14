import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car.model';
import { CarService } from '../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent implements OnInit {

  public car!: Car;

  constructor(private carService: CarService, 
              private route: ActivatedRoute,
              private favoritesService: FavoritesService) { 
    this.route.paramMap.subscribe(params =>{
      const id: number = Number(params.get('carId'));
      this.car = this.carService.getCars()
        .filter(c => c.carId === id)[0];
    });
  };

  ngOnInit(): void {
  }

  public addToFavorites(){
    this.favoritesService.addToFavorites(this.car);
  }
}