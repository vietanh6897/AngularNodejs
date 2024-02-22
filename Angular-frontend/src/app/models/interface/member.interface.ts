import { IUser } from './user.interface';

export interface IMember {
  id: string;
  projectId: string;
  userId: string;
  user: IUser;
}
