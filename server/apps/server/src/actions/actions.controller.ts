import { Controller, Get, Param, Query } from '@nestjs/common';
import { Action } from '@libs/db/model';
import { Crud } from 'nestjs-mongoose-crud';
import { ActionsService } from './actions.service';
import { ApiOperation } from '@nestjs/swagger';
import { Pagination } from 'apps/admin/src/decorator/pagination.decorator';
import { PaginationParams } from '@libs/db/repository';
@Crud({model:Action,routes:{update:false}})
@Controller('actions')
export class ActionsController {
    constructor(private readonly actionService:ActionsService){}

    @ApiOperation({description:'get resource of action'})
    @Get(':resource/:id')
    async getAction(@Param('resource') resource:string,@Param('id') id:string,@Pagination() pagination:PaginationParams<Action>){
        return this.actionService.getMyActionType(pagination,id,resource)
    }

}
