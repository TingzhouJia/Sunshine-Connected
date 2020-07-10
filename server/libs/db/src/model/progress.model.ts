import { prop, ModelOptions, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';

export enum ProgressType {
  STAGE1 = 'need audit',
  STAGE2 = 'in audit',
  FAILED = 'failed',
  SUCCESSED = 'successed',
}
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Progress {
  @ApiProperty({ description: 'status of progress' })
  @prop({ enum: ProgressType })
  status: string;
  @prop({ required: false })
  message: string;
  @prop()
  obj_id: string;
  @prop({ required: false })
  auditer_id?: string;
  @prop({ ref: 'User', localField: 'auditer_id', foreignField: '_id' })
  auditer?: Ref<User>;
}
