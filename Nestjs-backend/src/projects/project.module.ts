import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './controller/project.controller';
import { Project } from './entity/project.entity';
import { ProjectService } from './service/project.service';
import { ProjectRepository } from './repository/project.repository';
import { TypeOrmExModule } from 'src/configs/database/typeorm-ex.module';
import { MemberModule } from 'src/members/member.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    TypeOrmExModule.forCustomRepository([ProjectRepository]),
    MemberModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
