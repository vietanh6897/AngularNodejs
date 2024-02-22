export class ReqTask {
  public title: string;
  public description: string;
  public priority: string;
  public dueDate: Date;
  public startDate?: Date;
  public category: string;
  public status: string;
  public assignee: string;
}
export class ReqUpdateTask {
  public id?: string;
  public title?: string;
  public description?: string;
  public priority?: string;
  public dueDate?: Date;
  public startDate?: Date;
  public category?: string;
  public status?: string;
  public assignee?: string;
}
export class ReqTaskQuery {
  public searchKeyword?: string;
  public members?: string[];
  public category?: string[];
  public status?: string[];
  public priority?: string[];
}
