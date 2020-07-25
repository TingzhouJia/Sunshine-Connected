import { ApiProperty } from '@nestjs/swagger';
import { OrderType, PaginationParams } from '@libs/db/repository';

export class PaginationDto<T> extends PaginationParams<T> {
  public order?: Partial<Record<keyof T, "asc" | "desc" | "ascending" | "descending" | 1 | -1>>;

}
