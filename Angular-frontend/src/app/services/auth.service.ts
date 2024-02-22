import { Injectable } from '@angular/core';
import { ReqLogin } from '../models/dto/login.dto';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import ApiPaths from '../common/constant/api-paths';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(req: ReqLogin): Observable<any> {
    return this.http.post(ApiPaths.SignIn, req).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  public logout(): Observable<any> {
    return this.http.post(ApiPaths.LogOut, null).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
