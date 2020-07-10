import { ApiProperty } from '@nestjs/swagger';

export class Register {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
