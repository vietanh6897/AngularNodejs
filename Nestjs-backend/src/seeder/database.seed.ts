import { DataSource } from 'typeorm';
import { User } from 'src/users/entity/user.entity';
import { Project } from 'src/projects/entity/project.entity';
import { Member } from 'src/members/entity/member.entity';
import { Task } from 'src/tasks/entity/task.entity';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export async function run(dataSource: DataSource): Promise<void> {
  await dataSource.query(`SET FOREIGN_KEY_CHECKS = 0`);
  await dataSource.query(`TRUNCATE TABLE user`);
  await dataSource.query(`TRUNCATE TABLE project`);
  await dataSource.query(`TRUNCATE TABLE task`);
  await dataSource.query(`TRUNCATE TABLE member`);
  await dataSource.query(`SET FOREIGN_KEY_CHECKS = 1`);
  /**
     *  1) Create 5 users in user table
        2) Each user is member of three projects with status OPENED,PENDING,CLOSED
        3) Each project has four tasks with status DONE,INPROGRESS,TODO,TESTING
     */
  try {
    const userRepository = dataSource.getRepository(User);
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash('Aa12345678@', salt);
    const users = await userRepository.insert([
      {
        username: 'User1',
        email: 'user1@gmail.com',
        password: hashPassword,
      },
      {
        username: 'User2',
        email: 'user2@gmail.com',
        password: hashPassword,
      },
      {
        username: 'User3',
        email: 'user3@gmail.com',
        password: hashPassword,
      },
      {
        username: 'User4',
        email: 'user4@gmail.com',
        password: hashPassword,
      },
      {
        username: 'User5',
        email: 'user5@gmail.com',
        password: hashPassword,
      },
    ]);

    const projectRepository = dataSource.getRepository(Project);
    const memberRepository = dataSource.getRepository(Member);
    const taskRepository = dataSource.getRepository(Task);

    users.identifiers.forEach(async (user, index) => {
      const projects = [];
      const userProjects = await projectRepository.insert([
        {
          title: 'Project 1-' + index,
          projectCode: 'P1-' + index,
          description: 'Project 1-' + index,
          status: 'OPENED',
        },
        {
          title: 'Project 2-' + index,
          projectCode: 'P2-' + index,
          description: 'Project 2-' + index,
          status: 'PENDING',
        },
        {
          title: 'Project 3-' + index,
          projectCode: 'P3-' + index,
          description: 'Project 3-' + index,
          status: 'CLOSED',
        },
      ]);
      projects.push(...userProjects.identifiers);
      projects.forEach(async (project) => {
        const member = await memberRepository.insert({
          projectId: project.id,
          userId: user.id,
        });
        await taskRepository.insert([
          {
            title: 'Task-001',
            assignee: member.identifiers[0].id,
            description: 'Task 001',
            priority: 'Lowest',
            dueDate: new Date(),
            startDate: new Date(),
            category: 'Feature',
            status: 'TODO',
          },
          {
            title: 'Task-002',
            assignee: member.identifiers[0].id,
            description: 'Task 002',
            priority: 'Low',
            dueDate: new Date(),
            startDate: new Date(),
            category: 'Bug',
            status: 'INPROGRESS',
          },
          {
            title: 'Task-003',
            assignee: member.identifiers[0].id,
            description: 'Task 003',
            priority: 'High',
            dueDate: new Date(),
            startDate: new Date(),
            category: 'Feature',
            status: 'TESTING',
          },
          {
            title: 'Task-004',
            assignee: member.identifiers[0].id,
            description: 'Task 004',
            priority: 'Highest',
            dueDate: new Date(),
            startDate: new Date(),
            category: 'Bug',
            status: 'DONE',
          },
        ]);
      });
    });
  } catch (err) {
    throw new BadRequestException();
  }
}
