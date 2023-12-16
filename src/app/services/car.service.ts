import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICar, IPagination} from "../interfaces";
import {urls} from "../constans";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient:HttpClient) { }

  getAll(page=1):Observable<IPagination<ICar>>{
    return this.httpClient.get<IPagination<ICar>>(urls.cars.base,{params:{page}})
  }

  create(data:ICar):Observable<ICar>{
    return this.httpClient.post<ICar>(urls.cars.base, data)
  }

  updateById(id:number, data:ICar ):Observable<ICar>{
    return this.httpClient.put<ICar>(urls.cars.byId(id), data)
  }

  deleteById(id:number):Observable<void>{
    return this.httpClient.delete<void>(urls.cars.byId(id))
  }
}
