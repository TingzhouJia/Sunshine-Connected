import { Injectable } from '@nestjs/common';
import { ActionRepository, PaginationParams } from '@libs/db/repository';
import { Action } from '@libs/db/model';

@Injectable()
export class ActionsService {
    constructor(private readonly actionRepository:ActionRepository){}

    async getMyActionType(pagination:PaginationParams<Action>,id:string,type:string){
        this.actionRepository.getMyActionByType(id,pagination,type)
    }




}
