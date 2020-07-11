import { Injectable } from '@nestjs/common';

import { ReturnModelType } from '@typegoose/typegoose';
import { BaseRepository, PaginationParams } from './base.repository';
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


  async getMyActionByType(id:string,pagination:PaginationParams<Action>,type:string){
    return  super.paginator({...pagination,query:{author_id:id,name:type}},'',{populates:[{path:'object',populate:[{path:'viewedCount'}]}]})
  }

}
