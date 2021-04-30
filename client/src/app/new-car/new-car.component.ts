import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.model';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  public newCar: FormGroup;
  constructor(private carService: CarService, private formBuilder: FormBuilder) { 
    this.newCar = this.formBuilder.group({
      email: ['', []],
      type: ['', []],
      make: ['', []],
      model: ['', []],
      year: ['', []],
      mileage: ['', []],
      engineSize: ['', []],
      fuelType: ['', []],
      emissionClass: ['', []],
      horsepower: ['', []],
      transmission: ['', []],
      numberOfDoors: ['', []],
      numberOfSeats: ['', []],
      bootCapacity: ['', []],
      AC: [false,[]],
      body: ['', []],
      color: ['', []],
      damage: ['', []],
      registeredUntil: ['', []],
      country: ['', []],
      price: ['', []],
      images: this.formBuilder.array([this.formBuilder.control('')])
    });
  }

  get images(){
    return this.newCar.get('images') as FormArray;
  }

  addImage(){
    this.images.push(this.formBuilder.control(''));
  }

  public add(car: any){
    this.carService.postCar(car).
      subscribe((c: any) => {
        console.log(c);
        window.alert(c.msg);
      });
  };

  ngOnInit(): void {
  }

}