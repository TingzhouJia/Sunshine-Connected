import { User } from '@libs/db/model';
import { ApiProperty } from '@nestjs/swagger';

export class CourseDto {
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly cover: string;
  @ApiProperty()
  readonly file: string;
  @ApiProperty()
  readonly author_id: string;
  @ApiProperty()
  readonly course_id?: string;
  @ApiProperty()
  readonly progress_id?: string;
  @ApiProperty()
  readonly category:string[];
  @ApiProperty()
  readonly format:string

}
