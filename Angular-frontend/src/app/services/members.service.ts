import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import ApiPaths from '../common/constant/api-paths';
import { ReqMember } from '../models/dto/member.dto';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  constructor(private http: HttpClient) {}

  public addMember(req: ReqMember[]): Observable<any> {
    return this.http.post(ApiPaths.AddMember, req).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  public deleteMember(id: string): Observable<any> {
    return this.http.delete(ApiPaths.DeleteMember + id).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  public listProjectMembers(projectId: string): Observable<any> {
    return this.http.get(ApiPaths.ListProjectMembers + projectId).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
