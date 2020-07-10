import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';
import { AuditRepository } from '@libs/db/repository/audit.repository';

@Module({
  providers: [AuditService, AuditRepository],
  controllers: [AuditController],
  imports: [AuditRepository],
})
export class AuditModule {}
