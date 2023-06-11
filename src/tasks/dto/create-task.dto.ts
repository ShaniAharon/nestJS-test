import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  //validation handle cases were its empty etc , also show error message
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
