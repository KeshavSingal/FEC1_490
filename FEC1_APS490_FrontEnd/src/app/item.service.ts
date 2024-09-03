import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://127.0.0.1:8000/items/';

  constructor(private http: HttpClient) { }

  getItems(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createItem(name: string): Observable<any> {
    return this.http.post(this.apiUrl, { name });  // Make sure to send name as an object
  }

  updateItem(id: number, name: string): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}`, { name });  // Send updated name as an object
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
}
