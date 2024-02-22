import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { Member } from 'src/members/entity/member.entity';
import { MemberRepository } from 'src/members/repository/member.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Member)
    private memberRepository: MemberRepository,
  ) {}

  // Implement CRUD methods using userRepository
  async getUsers(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'username', 'email'], // Exclude 'password' field
    });
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.username', 'user.email'])
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;
    // Hash password.
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      username,
      email,
      password: hashPassword,
    });
    return this.userRepository.save(user);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);
    const { username, email } = updateUserDto;
    user.username = username;
    user.email = email;
    await this.userRepository.save(user);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  // Custom methods besides CRUD

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    return user;
  }

  async getUsersNotInProject(projectId: string): Promise<User[]> {
    // Get user IDs associated with the project
    const projectMemberIds = await this.memberRepository
      .createQueryBuilder('member')
      .select('member.userId')
      .where('member.projectId = :projectId', { projectId })
      .getMany();
    const userIdsInProject = projectMemberIds.map((member) => member.userId);
    // Get users not in the project
    return this.userRepository.find({
      where: {
        id: userIdsInProject.length ? Not(In(userIdsInProject)) : undefined,
      },
    });
  }
}
