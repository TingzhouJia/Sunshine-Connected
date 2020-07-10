import { User } from '@libs/db/model/user.model';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';

export type UserEntity = User;
export type UserModel = ReturnModelType<typeof User>;

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User) private readonly _model: UserModel) {
    super(_model);
  }

  async create(doc: Partial<User>): Promise<DocumentType<User>> {
    doc.username = doc.username ? doc.username : doc.email;
    const user = await super.create(doc);
    return user.save();
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.findOneAsync({ email });
  }

  async getUserByPhone(phone: string): Promise<User> {
    return this.findOneAsync({ phone });
  }
}
