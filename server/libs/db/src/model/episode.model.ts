import { prop, ModelOptions, Ref } from '@typegoose/typegoose';
import { Course } from './course.model';
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Episode {
  @prop()
  name: string;
  @prop()
  file: string;
  @prop({ ref: 'Course' })
  course: Ref<Course>;
}
