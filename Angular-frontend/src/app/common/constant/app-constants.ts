export default class AppConstants {
  public static ProjectStatus = [
    {
      value: 'OPENED',
    },
    {
      value: 'PENDING',
    },
    {
      value: 'CLOSED',
    },
  ];
  public static TaskCategory = [
    {
      value: 'Feature',
    },
    {
      value: 'Bug',
    },
  ];
  public static TaskStatus = [
    {
      value: 'TODO',
    },
    {
      value: 'INPROGRESS',
    },
    {
      value: 'TESTING',
    },
    {
      value: 'DONE',
    },
  ];
  public static TaskPriority = [
    {
      value: 'Lowest',
    },
    {
      value: 'Low',
    },
    {
      value: 'High',
    },
    {
      value: 'Highest',
    },
  ];
}
