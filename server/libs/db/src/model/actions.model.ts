import { prop, ModelOptions, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import { Course } from './course.model';

import { ApiProperty } from '@nestjs/swagger';

import { Workshop } from './workshop.model';

@ModelOptions({
  options: {
    customName: 'Action',
  },
  schemaOptions: {
    timestamps: true,
  },
})
export class Action {
  @ApiProperty({ description: 'user who act' })
  @prop({
    ref: 'User',
    required: false,
    localField: 'author_id',
    foreignField: '_id',
    justOne: true,
  })
  user?: Ref<User>;
  @ApiProperty()
  @prop()
  author_id: string;
  @ApiProperty({ description: 'type of target' })
  @prop({ enum: ['Course', 'User', 'Workshop'] })
  types: string;
  @ApiProperty({ description: 'object of target' })
  @prop({ refPath: 'types' })
  object: Ref<Course | User | Workshop>;
  @ApiProperty({ description: 'obj id' })
  @prop()
  obj_id: string;
  @ApiProperty()
  @ApiProperty({ description: 'type of action' })
  @prop({ enum: ['like', 'subscribe', 'register', 'view'] })
  name: string;
}
