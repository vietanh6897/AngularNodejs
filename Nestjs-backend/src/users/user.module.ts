import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmExModule } from 'src/configs/database/typeorm-ex.module';
import { MemberRepository } from 'src/members/repository/member.repository';
import { Member } from 'src/members/entity/member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Member]),
    TypeOrmExModule.forCustomRepository([UserRepository, MemberRepository]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmExModule.forCustomRepository([UserRepository])],
})
export class UserModule {}
