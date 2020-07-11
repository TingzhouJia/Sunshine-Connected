import { Controller, Get, Param, Post, Body, UseInterceptors, Put, Delete } from '@nestjs/common';
import { Audit } from '@libs/db/model';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Pagination } from '../decorator/pagination.decorator';
import { PaginationParams } from '@libs/db/repository';
import { AuditService } from './audit.service';
import { AuditDto } from './dto/audit.dto';
import { AuditInterceptor } from '@app/services/interceptor';
@Crud({ model: Audit,routes:{create:false} })
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

  @Post('')
  @UseInterceptors(AuditInterceptor)
  async createAudit(@Body('audit') body:AuditDto){
    return await this.auditService.createAudit(body)
  }

  @Delete(':id')
  @UseInterceptors(AuditInterceptor)
  async deleteAudit(@Param('id') id:string){
    return await this.auditService.deleteAudit(id)
  }
}
