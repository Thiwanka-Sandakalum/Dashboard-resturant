import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private url = 'https://resturant.azurewebsites.net/api'

    constructor(private http: HttpClient) { }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/order`).pipe(
      catchError(error => {
        this.handleApiError(error);
        throw error;
      })
    )
  }

  // get menus data
  getMenus(): Observable<any[]> {
    return this.http.get<any>(`${this.url}/menu`).pipe(
      catchError(error => {
        this.handleApiError(error);
        throw error;
      })
    )
  }

  createMenu(newMenu: any): Observable<any[]> {
    const data = newMenu
    console.log(JSON.stringify(data));
    return this.http.post<any>(`${this.url}/menu`, data).pipe(
      catchError(error => {
        this.handleApiError(error);
        throw error;
      })
    )
  }

  editMenu(id: any, price: any): Observable<any[]> {
    const data = {
      id: id,
      price: price
    };

    console.log(JSON.stringify(data));

    return this.http.put<any>(`${this.url}/menu`, data).pipe(
      catchError(error => {
        this.handleApiError(error);
        throw error;
      })
    );
  }

  deleteMenu(id: any): Observable<any> {
    const data = { id: id };
    return this.http.delete<any>(`${this.url}/menu`, { body: data }).pipe(
      catchError(error => {
        this.handleApiError(error);
        throw error;
      })
    );
  }


  private handleApiError(error: any): void {
    if (error?.error?.message) {
      console.log(error.message)
    } else {
      console.log("API Error")
    }
  }
}
