import { ApiProperty } from "@nestjs/swagger"


export class PaginationDto {
    @ApiProperty()
    readonly limit:any
    @ApiProperty()
    readonly offset:number
    @ApiProperty()
    readonly page:number
}