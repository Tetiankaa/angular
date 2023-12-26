import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ICar, IPagination} from "../interfaces";
import {urls} from "../constans";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private trigger = new BehaviorSubject<boolean>(false);
  private carForUpdate = new BehaviorSubject<ICar>(null);

  constructor(private httpClient:HttpClient) { }

  getAll(page=1):Observable<IPagination<ICar>>{
    return this.httpClient.get<IPagination<ICar>>(urls.cars.base,{params:{page}} )
  }

  create(data:ICar):Observable<ICar>{
    return this.httpClient.post<ICar>(urls.cars.base, data).pipe(tap(()=>{
      this.trigger.next(!this.trigger.value)
    }))
  }

  updateById(id:number, data:ICar ):Observable<ICar>{
    return this.httpClient.put<ICar>(urls.cars.byId(id), data).pipe(tap(()=>{
      this.carForUpdate.next(null);
      this.trigger.next(!this.trigger.value);

    }))
  }

  deleteById(id:number):Observable<void>{
    return this.httpClient.delete<void>(urls.cars.byId(id)).pipe(tap(()=>{
      this.trigger.next(!this.trigger.value)
    }))
  }

  getTrigger():Observable<boolean>{
    return this.trigger.asObservable();
  }

  getCarForUpdate():Observable<ICar>{
    return this.carForUpdate.asObservable();
  }

  setCarForUpdate(data:ICar):void{
    this.carForUpdate.next(data);
  }
}
