import { Injectable, NestInterceptor } from "@nestjs/common";


@Injectable()
export class MailInterceptor implements NestInterceptor{
    intercept(context: import("@nestjs/common").ExecutionContext, next: import("@nestjs/common").CallHandler<any>): import("rxjs").Observable<any> | Promise<import("rxjs").Observable<any>> {
        throw new Error("Method not implemented.");
    }

    constructor(){}
    
}