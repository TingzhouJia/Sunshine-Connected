import { Controller, Get, Param, Post, Body, UseInterceptors, Put, Delete } from '@nestjs/common';
import { Audit } from '@libs/db/model';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Pagination } from '../decorator/pagination.decorator';
import { PaginationParams } from '@libs/db/repository';
import { AuditService } from './audit.service';
import { AuditDto } from './dto/audit.dto';

import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuditInterceptor } from './auditChange.interceptor';
@ApiTags('audit')
@Controller('audit')
export class AuditController {
  constructor(
    @InjectModel(Audit) private readonly _model: ReturnModelType<typeof Audit>,
    private readonly auditService: AuditService,
  ) {}
  @ApiOperation({description:'find my audit'})
  @Get('pagination/:id')
  async getMyAuditPagination(
    @Pagination() pagination: PaginationParams<Audit>,
    @Param('id') id: string,
  ) {
    return this.auditService.getMyCurAduit(id, pagination);
  }

  @ApiOperation({description:'create audit'})
  @ApiBody({type:AuditDto,})
  @Post('/create')
  @UseInterceptors(AuditInterceptor)
  async createAudit(@Body('audit') body:AuditDto){
  
    return await this.auditService.createAudit(body)
  }

  @ApiOperation({description:'when audit is finished, and it is successful, delete audit'})
  @Delete(':id')
  @UseInterceptors(AuditInterceptor)
  async deleteAudit(@Param('id') id:string){
    return await this.auditService.deleteAudit(id)
  }
  @ApiOperation({description:'update the audit when audit is failed'})
  @Put(':id')
  @UseInterceptors(AuditInterceptor)
  async updateAudit(@Param('id') id:string,@Body('audit') audit:AuditDto){
    return await this.auditService.updateAudit(id,audit)
  }
}
