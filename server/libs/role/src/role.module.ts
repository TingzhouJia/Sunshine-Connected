import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { roles } from './app.roles';
import { AccessControlModule } from 'nest-access-control';

const cur = AccessControlModule.forRoles(roles);
@Module({
  imports: [cur],
  providers: [RoleService],
  exports: [RoleService, cur],
})
export class RoleModule {}
