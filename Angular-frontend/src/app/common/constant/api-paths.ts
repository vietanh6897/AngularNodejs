import { environment } from '../../../environments/environment';

export default class ApiPaths {
  // Auth
  public static SignIn = environment.baseUrl.concat('/auth/login');
  public static LogOut = environment.baseUrl.concat('/auth/logout');

  //Member
  public static AddMember = environment.baseUrl.concat('/members');
  public static DeleteMember = environment.baseUrl.concat('/members/');
  public static ListProjectMembers =
    environment.baseUrl.concat('/members/project/');

  //Project
  public static ProjectDetail = environment.baseUrl.concat('/projects/');
  public static CreateProject = environment.baseUrl.concat('/projects');
  public static ProjectInfo = environment.baseUrl.concat('/projects/');
  public static UpdateProject = environment.baseUrl.concat('/projects/');
  public static DeleteProject = environment.baseUrl.concat('/projects/');
  public static ListUserProjects =
    environment.baseUrl.concat('/projects/user/');

  //User
  public static UserInfo = environment.baseUrl.concat('/users/');
  public static AvailableUsers =
    environment.baseUrl.concat('/users/available/');
  //Task
  public static ProjectTasks = environment.baseUrl.concat('/tasks/project/');
  public static UpdateTask = environment.baseUrl.concat('/tasks/');
  public static CreateTask = environment.baseUrl.concat('/tasks');
  public static DeleteTask = environment.baseUrl.concat('/tasks/');
}
