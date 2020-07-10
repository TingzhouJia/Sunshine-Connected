import { Controller, Get, Param } from '@nestjs/common';
import { Audit } from '@libs/db/model';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Pagination } from '../decorator/pagination.decorator';
import { PaginationParams } from '@libs/db/repository';
import { AuditService } from './audit.service';
@Crud({ model: Audit })
@Controller('audit')
export class AuditController {
  constructor(
    @InjectModel(Audit) private readonly _model: ReturnModelType<typeof Audit>,
    private readonly auditService: AuditService,
  ) {}

  @Get('pagination/:id')
  async getMyAuditPagination(
    @Pagination() pagination: PaginationParams<Audit>,
    @Param('id') id: string,
  ) {
    return this.auditService.getMyCurAduit(id, pagination);
  }
}
