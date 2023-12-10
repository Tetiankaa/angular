import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ICar} from "../interfaces";
import {urls} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private trigger = new BehaviorSubject<boolean>(null);
  private carForUpdate = new BehaviorSubject<ICar>(null);

  constructor(private  httpClient:HttpClient) { }

  getAll():Observable<ICar[]>{
    return this.httpClient.get<ICar[]>(urls.cars.base)
  }

  create(data:ICar):Observable<ICar>{
    return this.httpClient.post<ICar>(urls.cars.base, data)
  }

  updateById(id:number, data:ICar):Observable<ICar>{
    return  this.httpClient.put<ICar>(urls.cars.byId(id), data)
  }

  deleteById(id:number):Observable<void>{
    return this.httpClient.delete<void>(urls.cars.byId(id))
  }

  getTriggerStatus():Observable<boolean>{
    return this.trigger.asObservable()
  }

  setTrigger():void{
    this.trigger.next(!this.trigger.value)
  }

  getCarForUpdate():Observable<ICar>{
    return this.carForUpdate.asObservable();
  }

  setCarForUpdate(car:ICar):void{
    this.carForUpdate.next(car);
  }
}
