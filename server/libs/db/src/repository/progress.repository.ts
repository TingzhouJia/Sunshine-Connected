import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Progress } from '../model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class ProgressRepository extends BaseRepository<Progress> {
  constructor(
    @InjectModel(Progress)
    private readonly _model: ReturnModelType<typeof Progress>,
  ) {
    super(_model);
  }
  /**
   *
   * @param doc material for create
   */
  async createProgress(doc: Partial<Progress>) {
    return await super.create(doc);
  }

  async findProgress(condition: any): Promise<Progress> {
    return await super.findOneAsync(condition);
  }
  /**
   * @description this function is called when dong audit
   * @param doc material for update
   * @param id  _id of progress
   */
  async updateProgress(doc: Partial<Progress>, id: string) {
    return await super.updateAsync(id, doc);
  }
  /**
   * @description this function called when finish audition or delete a parent(workshop or video)
   * @param id delete by obj_id,not _id
   */
  async deleteProgress(id: string) {
    return await super.deleteAsync({ obj_id: id });
  }
}
