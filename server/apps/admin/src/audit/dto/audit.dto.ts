import { ApiProperty } from "@nestjs/swagger"

export class AuditDto{
    @ApiProperty()
    auditor_id:string
    @ApiProperty()
    type?:string
    @ApiProperty()
    obj_id:string
    @ApiProperty()
    deadline?:Date
    @ApiProperty()
    progress_id?:string
    @ApiProperty()
    message?:string
}