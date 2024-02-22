import { Repository } from 'typeorm';
import { CustomRepository } from 'src/configs/database/typeorm-ex.decorator';
import { Member } from '../entity/member.entity';

@CustomRepository(Member)
export class MemberRepository extends Repository<Member> {
  // Add custom methods for project data access here
}
