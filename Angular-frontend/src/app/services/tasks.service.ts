import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import ApiPaths from '../common/constant/api-paths';
import { ReqTask, ReqTaskQuery, ReqUpdateTask } from '../models/dto/task.dto';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  public getProjectTasks(
    projectId: string,
    params?: ReqTaskQuery
  ): Observable<any> {
    let httpParrams = new HttpParams();
    httpParrams = params?.searchKeyword
      ? httpParrams.set('searchKeyword', params.searchKeyword)
      : httpParrams;
    httpParrams = params?.members
      ? httpParrams.set('members', params.members.join(','))
      : httpParrams;
    httpParrams = params?.category
      ? httpParrams.set('category', params.category.join(','))
      : httpParrams;
    httpParrams = params?.status
      ? httpParrams.set('status', params.status.join(','))
      : httpParrams;
    httpParrams = params?.priority
      ? httpParrams.set('priority', params.priority.join(','))
      : httpParrams;
    return this.http
      .get(ApiPaths.ProjectTasks + projectId, { params: httpParrams })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  public updateTask(req: ReqUpdateTask): Observable<any> {
    return this.http.put(ApiPaths.UpdateTask + req.id, req).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  public createTask(req: ReqTask): Observable<any> {
    return this.http.post(ApiPaths.CreateTask, req).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  public deleteTask(taskId: string): Observable<any> {
    return this.http.delete(ApiPaths.DeleteTask + taskId).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
