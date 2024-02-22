export class ReqProject {
  public title: string;
  public description: string;
  public projectCode: string;
  public status: string;
}

export class ReqUpdateProject {
  public id: string;
  public title?: string;
  public description?: string;
  public projectCode?: string;
  public status?: string;
}
