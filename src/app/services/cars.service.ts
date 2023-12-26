import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ICar, IPagination} from "../interfaces";
import {urls} from "../constants";
import {trigger} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  trigger = new BehaviorSubject<boolean>(null);
  carForUpdate = new BehaviorSubject<ICar>(null)
  constructor(private httpClient:HttpClient) { }

  getCarForUpdate():Observable<ICar>{
    return this.carForUpdate.asObservable();
  }
  setCarForUpdate(data:ICar):void{
    this.carForUpdate.next(data);
  }
  setTrigger():void{
    this.trigger.next(!trigger);
  }

  getTrigger():Observable<boolean>{
    return this.trigger.asObservable();
  }
  getAll(page:number):Observable<IPagination<ICar>>{
    return this.httpClient.get<IPagination<ICar>>(urls.cars.base,{params:{page}})
  }

  create(data:ICar):Observable<ICar>{
    return this.httpClient.post<ICar>(urls.cars.base, data)
  }

  updateById(id:number, data:ICar):Observable<ICar>{
    return this.httpClient.put<ICar>(urls.cars.byId(id), data)
  }

  deleteById(id:number):Observable<void>{
    return this.httpClient.delete<void>(urls.cars.byId(id))
  }

  addPhotoById(id:number, photo:FormData):Observable<ICar>{
    return this.httpClient.put<ICar>(urls.cars.addPhoto(id),photo)
  }
}
