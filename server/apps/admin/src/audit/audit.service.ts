import { Injectable } from '@nestjs/common';
import { AuditRepository } from '@libs/db/repository/audit.repository';

import { PaginationParams } from '@libs/db/repository';
import { Audit } from '@libs/db/model';

@Injectable()
export class AuditService {
  constructor(private readonly auditRepository: AuditRepository) {}

  async getMyCurAduit(id: string, pagination: PaginationParams<Audit>) {
    return await this.auditRepository.getMyAudit(pagination, id);
  }
  async createAudit(doc:Partial<Audit>){
    return await this.auditRepository.createIt(doc)
    
  }

  async deleteAudit(id:string){
    return await this.auditRepository.deleteByIdAsync(id)
  }

  async updateAudit(id:string,doc:Partial<Audit>){
    return await this.auditRepository.updateAsync(id,doc)
  }

  
}
