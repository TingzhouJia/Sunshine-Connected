import { Injectable } from '@nestjs/common';

import { ReturnModelType } from '@typegoose/typegoose';
import { BaseRepository } from './base.repository';
import { InjectModel } from 'nestjs-typegoose';
import { Action } from '../model';

export type ActionEntity = Action;
export type ActionModel = ReturnModelType<typeof Action>;
@Injectable()
export class ActionRepository extends BaseRepository<Action> {
  constructor(@InjectModel(Action) private readonly _model: ActionModel) {
    super(_model);
  }

  async create(doc: Partial<Action>): Promise<any> {
    return super.create(doc);
  }

  async remove(id: string) {
    return super.deleteAsync(id);
  }

  async getActionsById(id: string) {
    return super.findAllAsync({ user: id }, {});
  }
}
