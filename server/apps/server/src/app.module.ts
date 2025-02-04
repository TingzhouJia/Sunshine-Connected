import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesController } from './courses/courses.controller';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { ActionsModule } from './actions/actions.module';
import { CommonModule } from '@app/common';

@Module({
  imports: [CoursesModule, AuthModule, ActionsModule,CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
