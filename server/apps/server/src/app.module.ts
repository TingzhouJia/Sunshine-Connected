import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesController } from './courses/courses.controller';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { ActionsModule } from './actions/actions.module';

@Module({
  imports: [CoursesModule, AuthModule, ActionsModule],
  controllers: [AppController, CoursesController],
  providers: [AppService],
})
export class AppModule {}
