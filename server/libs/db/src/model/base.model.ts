import { prop, buildSchema } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { AnyType } from '../repository/base.repository';

export abstract class BaseModel {
  @prop()
  created_at?: Date; // 创建时间
  @prop()
  updated_at?: Date; // 更新时间

  public id?: string; // 实际上是 model._id getter

  // 如果需要，可以向基本模型添加更多内容。

  static get schema(): Schema {
    return buildSchema(this as AnyType, {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
      toJSON: {
        virtuals: true,
        getters: true,
        versionKey: false,
      },
    });
  }

  static get modelName(): string {
    return this.name;
  }
}
