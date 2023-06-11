import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  //ConfigModule , allow access to the configService
  imports: [TypeOrmModule.forFeature([Task]), AuthModule], // inject the tasksrepo allow to use in the app
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}
