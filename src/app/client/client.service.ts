import { Injectable } from '@angular/core';
import { CLIENTS } from './client_list.json';
import { formatDate, DatePipe } from '@angular/common';
import { Client } from './client';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders }from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

//Represent business logic  
@Injectable({
  providedIn: 'root'
})
export class ClientService {
private urlEndPoint: string = 'http://localhost:8080/api/clients';
private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http:HttpClient, private router:Router) { }

  getClients (page:number):Observable<Client[]> {
    //return of(CLIENTS);
    return this.http.get(this.urlEndPoint+'/page/'+page).pipe(
      tap((response : any) => {//:any for specificate that receive any type of data
        //let clients = response as Client[];
        console.log('ClientService: tap 1');
        (response.content as Client[]).forEach(
          client=>{
            console.log(client.firstName);
          }
        )
      }),
      map((response:any) => {
        (response.content as Client[]).map(client => {
          //client.firstName = client.firstName.toUpperCase();
          let datePipe = new DatePipe('en-UK');
          //client.createAt = datePipe.transform(client.createAt, 'dd/MM/yyyy');
          //This WAY or
          //client.createAt = formatDate(client.createAt, 'dd-MM-yyyy',"en-UK");
          return client;
        });
        return response;
      }),
      tap(response => {
        console.log('ClientService: tap 2');
        (response.content as Client[]).forEach(
          client=>{
            console.log(client.firstName);
          }
        )
      }));
    
  }

  create(client:Client):Observable<any>{
    return this.http.post(this.urlEndPoint, client, {headers: this.httpHeaders}).pipe(
      map((response:any) => response.client as Client),
      catchError(e=> {
        if(e.status==400){
          return throwError(e);
        }
        this.router.navigate(['/clients']);
        console.error(e.error.message);
        swal.fire("Error to create...", e.error.message,"error");
        return throwError(e);
      })
    );
  }

  getClient(id):Observable<Client>{
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e=> {
        this.router.navigate(['/clients']);
        console.error(e.error.message);
        swal.fire("Error to update...", e.error.message,"error");
        return throwError(e);
      })
    );
  }

  updateClient(client :Client):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${client.id}`,client, {headers: this.httpHeaders}).pipe(
      catchError(e=> {
        if(e.status==400){
          return throwError(e);
        }
        this.router.navigate(['/clients']);
        console.error(e.error.message);
        swal.fire("Error to update...", e.error.message,"error");
        return throwError(e);
      })
    );
  }

  deleteClient(id):Observable<Client>{
    return this.http.delete<Client>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders}).pipe(
      catchError(e=> {
        this.router.navigate(['/clients']);
        console.error(e.error.message);
        swal.fire("Error to delete...", e.error.message,"error");
        return throwError(e);
      })
    );
  }

  uploadPicture(file:File,id): Observable<Client>{
    let formData = new FormData(); //see FormData API
    formData.append("file", file);
    formData.append("id", id);
    return this.http.post(`${this.urlEndPoint}/upload/`,formData).pipe(
      map( (response:any)=>response.client as Client),
      catchError(e=> {
        this.router.navigate(['/clients']);
        console.error(e.error.message);
        swal.fire("Error to delete...", e.error.message,"error");
        return throwError(e);
      })
    );
  }

}
