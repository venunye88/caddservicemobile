import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LookUpService {

  constructor(private http: HttpClient) { }

  // fetch(storeName: string) {
  //   let lookUp = this.getModel(storeName)
  //   return this.http.get<any[]>(`${environment.baseApi}/${lookUp.api || lookUp.name}`)
  // }

  fetchEnum(name: string) {
    return this.http.get<Enum[]>(`${environment.baseApi}/enums/getlist?name=${name}`)
  }
}

export interface Enum {
  label: string
  value: string
}



