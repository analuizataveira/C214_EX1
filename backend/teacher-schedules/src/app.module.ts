import { Module } from '@nestjs/common';
import { SchedulesModule } from './schedules/schedules.module';
import { AuthModule } from './auth/auth.module';
import { StorageModule } from './local-db/local-db.module';

@Module({
  imports: [SchedulesModule, AuthModule, StorageModule],
})
export class AppModule {}
