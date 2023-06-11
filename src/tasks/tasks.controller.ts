import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController'); //string as the context of the logger
  constructor(private tasksService: TasksService) {
    // configService.get('env var name')
  }
  @Get() //handle get requests
  getTasks(
    @Query() filterDto: GetTaskFilterDto,
    @GetUser() user: User, // we want to get only the tasks for the user
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  // //http://localhost:3000/tasks/id34234
  // @Get('/:id') //will get the id as a param on the req
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  @Post()
  createTask(
    //use the Body and the prop name to spicfy what we want to use from the body
    // @Body('title') title: string,
    // @Body('description') description: string,
    //Better way use DTO a commen structure that can be handled and change from one place
    @Body() CreateTaskDto: CreateTaskDto, //will referance to the object structure we want {title, description}
    @GetUser() user: User, // get the user so we can use it
  ): Promise<Task> {
    this.logger.verbose(
      `User "${user.username}" creating a new task. Data: ${JSON.stringify(
        CreateTaskDto,
      )}`,
    );
    // return this.tasksService.createTask(title, description);
    return this.tasksService.createTask(CreateTaskDto, user); // use DTO {title, discription}
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    // @Body('status') status: TaskStatus,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto, //better way use dto , with handle error if the status not in the enum
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
