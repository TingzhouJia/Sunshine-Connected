import {
  ModelOptions,
  prop,
  Ref,
  Post,
  buildSchema,
  getModelForClass,
} from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from './course.model';
import { User } from './user.model';
import { Answer } from './answer.model';

@ModelOptions({
  options: {
    customName: 'Question',
  },
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
  },
})
@Post('remove', function (doc) {
  console.log('remove answer when questions remove');
  getModelForClass(Answer).remove({ question_id: doc._id });
})
@Post('findOneAndRemove', function (doc) {
  console.log('remove answer when question remove');
  getModelForClass(Answer).remove({ question_id: doc._id });
})
export class Question {
  @ApiProperty({ description: 'related course' })
  @prop({
    ref: 'Course',
    localField: 'course_id',
    foreignField: '_id',
    justOne: true,
  })
  course: Ref<Course>;
  @ApiProperty()
  @prop()
  course_id: string;
  @ApiProperty({ description: 'user ask question' })
  @prop({
    ref: 'User',
    localField: 'author_id',
    foreignField: '_id',
    justOne: true,
  })
  author: Ref<User>;

  @ApiProperty({ description: '' })
  @prop()
  author_id: string;

  @ApiProperty({ description: 'whether answered officially' })
  @prop()
  isAnswered: boolean;

  @ApiProperty({ description: 'question name' })
  @prop()
  content: string;

  @ApiProperty({ description: 'timing of question' })
  @prop()
  timing: string;

  @ApiProperty({ description: 'answer to question' })
  @prop({ ref: 'Answer', localField: '_id', foreignField: 'question_id' })
  answer: Ref<Answer>[];
}
