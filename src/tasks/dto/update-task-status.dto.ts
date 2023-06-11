import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus) //will validate if we have one of the enum prop and handle error
  status: TaskStatus;
}
