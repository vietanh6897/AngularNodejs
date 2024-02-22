import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberDto, UpdateMemberDto } from '../dto/member.dto';
import { Member } from '../entity/member.entity';
import { Project } from 'src/projects/entity/project.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  // Implement your service methods here
  async getMembers(): Promise<Member[]> {
    return this.memberRepository.find();
  }

  async getMemberById(id: string): Promise<Member> {
    const member = await this.memberRepository.findOneBy({ id });
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return member;
  }

  async createMember(createMembersDto: CreateMemberDto[]): Promise<Member[]> {
    const members: Member[] = [];
    for (const createMemberDto of createMembersDto) {
      const { projectId, userId } = createMemberDto;
      const member = this.memberRepository.create({ projectId, userId });
      members.push(member);
    }
    return this.memberRepository.save(members);
  }

  async updateMember(
    id: string,
    updateMemberDto: UpdateMemberDto,
  ): Promise<Member> {
    const member = await this.getMemberById(id);
    const { projectId, userId } = updateMemberDto;
    member.projectId = projectId;
    member.userId = userId;
    await this.memberRepository.save(member);
    return member;
  }

  async deleteMember(id: string): Promise<void> {
    const result = await this.memberRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
  }

  async findProjectsByUser(userId: string): Promise<Project[]> {
    const members = await this.memberRepository.find({
      where: { userId },
      relations: ['project'],
    });
    return members.map((member) => member.project);
  }

  async findMembersByProject(projectId: string): Promise<Member[]> {
    return this.memberRepository
      .createQueryBuilder('member')
      .leftJoinAndSelect('member.user', 'user')
      .select([
        'member.id',
        'member.projectId',
        'member.userId',
        'user.username',
        'user.email',
      ])
      .where('member.projectId = :projectId', { projectId })
      .getMany();
  }
}
