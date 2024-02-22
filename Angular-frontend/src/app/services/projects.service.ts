import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import ApiPaths from '../common/constant/api-paths';
import { ReqProject, ReqUpdateProject } from '../models/dto/project.dto';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  public projectHasChanged$$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  public getProjectDetail(id: string): Observable<any> {
    return this.http.get(ApiPaths.ProjectDetail + id).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  public createProject(req: ReqProject): Observable<any> {
    return this.http.post(ApiPaths.CreateProject, req).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  public updateProject( req: ReqUpdateProject): Observable<any> {
    return this.http.put(ApiPaths.UpdateProject + req.id, req).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  public deleteProject(projectId: string): Observable<any> {
    return this.http.delete(ApiPaths.DeleteProject + projectId).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  public listUserProjects(userId: string): Observable<any> {
    return this.http.get(ApiPaths.ListUserProjects + userId).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
