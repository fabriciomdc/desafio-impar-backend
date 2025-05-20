import { Module } from '@nestjs/common';
import { AttendanceModule } from './attendance/attendance.module';
import { DatabaseModule } from './infra/database/dabase.module';
import { PubSubModule } from './infra/pubsub/pubsub.module';

@Module({
  imports: [AttendanceModule, DatabaseModule, PubSubModule],
})
export class AppModule {}
