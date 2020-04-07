import { Injectable } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: Http) { }

  getShoppingItems(){
    return this.http.get('api/items')
    .map(res => res.json());
  }

  addShoppingItem(newItem){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post("api/item", newItem, {headers: headers})
    .map( res=> res.json());
  }

  deleteShoppingItem(id){
    return this.http.delete("api/item/" +id)
  }

  updateShoppingItem(newItem){

    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put("api/item/" +newItem._id,newItem, {headers: headers})
    .map(res => res.json());

  }
}
