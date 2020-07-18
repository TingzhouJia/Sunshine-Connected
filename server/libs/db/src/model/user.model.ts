import { prop, ModelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';

export enum UserEnum {
  VOLUNTEER = 'volunteer',
  COORDINATOR = 'coordinator',
  SENIOR = 'senior',
  ADMIN = 'admin',
}
@ModelOptions({
  schemaOptions: {
    _id: true,
    timestamps: true,
    toJSON: { virtuals: true },
  },
})
export class User {
  @ApiProperty({ description: 'username', example: 'user1' })
  @prop()
  username: string;
  @ApiProperty({ description: 'username', example: 'pass1' })
  @prop({
    select: false,
    set(val) {
      return val ? hashSync(val) : val;
    },
    get(val) {
      return val;
    },
  })
  password: string;
  @ApiProperty({ description: 'email' })
  @prop({ required: false })
  email?: string;

  @ApiProperty({ description: 'phone number' })
  @prop({ required: false })
  phone?: string;
  @prop({ default: '' })
  description: string;
  @ApiProperty({ description: 'avatar' })
  @prop()
  avatar: string;

  @prop({ enum: UserEnum })
  role: UserEnum;
}
