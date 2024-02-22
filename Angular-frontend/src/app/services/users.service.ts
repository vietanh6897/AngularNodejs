import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import ApiPaths from '../common/constant/api-paths';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public getUserInfo(userId: string): Observable<any> {
    return this.http.get(ApiPaths.UserInfo + userId).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  public getAvailableUsers(projectId: string): Observable<any> {
    return this.http.get(ApiPaths.AvailableUsers + projectId).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
