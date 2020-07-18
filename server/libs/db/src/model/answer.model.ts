import { ModelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Question } from './question.model';
import { User } from './user.model';

@ModelOptions({
  schemaOptions: { timestamps: true,toJSON:{virtuals:true}},
  options: { customName: 'Answer' },
})
export class Answer {
  @ApiProperty({ description: 'related question' })
  @prop({
    ref: 'Question',
    localField: 'question_id',
    foreignField: '_id',
    justOne: true,
  })
  question?: Ref<Question>;

  @ApiProperty({ description: 'question_id' })
  @prop({ required: true })
  question_id: string;

  @ApiProperty({ description: 'author of answer' })
  @prop({
    ref: 'User',
    localField: 'author_id',
    foreignField: '_id',
    justOne: true,
  })
  author: Ref<User>;
  @ApiProperty({ description: 'uid' })
  @prop()
  author_id: string;
  @ApiProperty({ description: 'content of answer' })
  @prop()
  content: string;
  @ApiProperty({ description: 'is posted or not' })
  @prop()
  isDraft: boolean;
}
