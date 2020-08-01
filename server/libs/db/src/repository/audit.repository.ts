import { BaseRepository, PaginationParams } from './base.repository';
import { Audit } from '../model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

export class AuditRepository extends BaseRepository<Audit> {
  constructor(
    @InjectModel(Audit) private readonly _model: ReturnModelType<typeof Audit>,
  ) {
    super(_model);
  }

  async getAuditPagination(pagination: PaginationParams<Audit>) {
    return super.paginator(pagination,'',{populates:[{path:"progress"},{path:'auditor'}]});
  }
  async getMyAudit(pagination: PaginationParams<Audit>, id: string) {
    return super.paginator({ ...pagination, query: { auditor_id: id } }, '', {
      populates: [{ path: 'progress' }, { path: 'object' }],
    });
  }

  async createIt(doc:Partial<Audit>){
    return super.create(doc)
  }



}
