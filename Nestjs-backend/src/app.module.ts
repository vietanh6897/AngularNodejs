import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './tasks/task.module';
import { typeOrmConfig } from './configs/database/typeorm.config';
import { ProjectModule } from './projects/project.module';
import { UserModule } from './users/user.module';
import { MemberModule } from './members/member.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guard/auth.guard';
import { IsUniqueConstraint } from './common/validation/is-unique-constraint';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TaskModule,
    ProjectModule,
    UserModule,
    MemberModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    IsUniqueConstraint,
  ],
})
export class AppModule {}
