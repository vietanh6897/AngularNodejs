export interface IProject {
  id: string;
  title: string;
  description: string;
  projectCode: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
