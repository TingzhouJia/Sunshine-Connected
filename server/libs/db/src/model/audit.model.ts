import {
  ModelOptions,
  prop,
  Ref,
  post,
  getModelForClass,
  DocumentType,
  Post,
} from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
import { Course } from './course.model';
import { Workshop } from './workshop.model';
import { Progress, ProgressType } from './progress.model';

@ModelOptions({
  options: { customName: 'Audit' },
  schemaOptions: { timestamps: true },
})
@Post('save', function (doc: DocumentType<Audit>) {
  getModelForClass(Progress).updateOne(
    { _id: doc.progress_id },
    {
      status: ProgressType.STAGE2,
      auditer_id: doc.auditor_id,
      message: doc.message,
    },
  );
  getModelForClass(Course).updateOne(
    { _id: doc.obj_id },
    { stage: ProgressType.STAGE2 },
  );
})
//update means course is not accepted
@Post('findOneAndUpdate', function (doc: DocumentType<Audit>) {
  const a = getModelForClass(Course).findById(doc.obj_id).exec();
  a.then((val) => {
    getModelForClass(Course).updateOne(
      { _id: doc.obj_id },
      { stage: ProgressType.FAILED, time: val.time + 1 },
    );
  });
  getModelForClass(Progress).updateOne(
    { _id: doc.progress_id },
    { status: ProgressType.FAILED },
  );
})
//delete means course is validated
@Post('findOneAndRemove', function (doc: DocumentType<Audit>) {
  const a = getModelForClass(Course).findById(doc.obj_id).exec();
  a.then((val) => {
    if (val.time !== 3) {
      getModelForClass(Course).updateOne(
        { _id: doc.obj_id },
        { stage: ProgressType.SUCCESSED },
      );
    }
  });
})
export class Audit {
  @ApiProperty({ description: 'user  audit' })
  @prop({ ref: 'User', localField: 'author_id', foreignField: '_id' })
  auditer: Ref<User>;
  @ApiProperty({ description: 'sender id' })
  @prop()
  auditor_id: string;
  @ApiProperty({ description: 'type need audit' })
  @prop({ enum: ['Workshop', 'Course'] })
  type: string;
  @ApiProperty({ description: 'object of audit' })
  @prop({ refPath: 'type', localField: 'obj_id', foreignField: '_id' })
  object: Ref<Workshop | Course>;
  @ApiProperty({ description: 'target id' })
  @prop()
  obj_id: string;
  @ApiProperty({ description: 'deadline for audit' })
  @prop()
  deadline: Date;
  @ApiProperty({ description: 'progress for audit' })
  @prop({ ref: 'Progress', localField: 'progress_id', foreignField: '_id' })
  progress: Ref<Progress>;

  @ApiProperty({ description: 'progress id' })
  @prop()
  progress_id: string;

  @prop({ required: false })
  message: string;
}
