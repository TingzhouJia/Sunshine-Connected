import { ApiProperty } from "@nestjs/swagger"
import { OrderType } from "@libs/db/repository"


export class PaginationDto<T> {
    @ApiProperty()
    readonly limit:any
    @ApiProperty()
    readonly offset:number
    @ApiProperty()
    readonly page:number

    readonly order:OrderType<T>
}