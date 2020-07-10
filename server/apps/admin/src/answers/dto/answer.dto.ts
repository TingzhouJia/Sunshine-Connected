import { ApiProperty } from '@nestjs/swagger';

export class AnswerDto {
  @ApiProperty()
  question_id: string;
  @ApiProperty()
  author_id: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  isDraft: boolean;
}
