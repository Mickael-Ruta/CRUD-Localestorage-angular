import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Iliste } from './liste/liste.component';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(private http : HttpClient) { }

  private readonly API: string = "api/list.json";

  public GetEtudiant():Observable<Iliste[]>{
    return this.http.get<Iliste[]>(this.API).pipe(
      tap(list=>console.log(list)
      ),
      catchError(this.handleError)
    )
  }
  private handleError(error:HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('an error occured ',error.error.message)
    }else{
      console.error(` backend return code ${error.status},` + `
       bode was ${error.error}`)
    }
    return throwError('something bad happened, please try again later');
  }
}
