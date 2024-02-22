import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from './controller/member.controller';
import { Member } from './entity/member.entity';
import { MemberService } from './service/member.service';
import { MemberRepository } from './repository/member.repository';
import { TypeOrmExModule } from 'src/configs/database/typeorm-ex.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    TypeOrmExModule.forCustomRepository([MemberRepository]),
  ],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [
    MemberService,
    TypeOrmExModule.forCustomRepository([MemberRepository]),
  ],
})
export class MemberModule {}
