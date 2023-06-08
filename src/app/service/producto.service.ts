import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoURL = 'http://localhost:8080/producto/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.productoURL + 'lista'); 
  }

  public detail(id: number): Observable<Producto> {
    return this.httpClient.get<Producto>(this.productoURL + `detail/${id}`); 
  }

  public detailname(nombre: string): Observable<Producto> {
    return this.httpClient.get<Producto>(this.productoURL + `detailname/${nombre}`); 
  }

  public save(producto: Producto): Observable<any> {
    return this.httpClient.post<any>(this.productoURL+'create', producto);
  }

  public update(id: number, producto: Producto): Observable<any> {
    return this.httpClient.put<any>(this.productoURL+`update/${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productoURL+`delete/${id}`);
  }

}
