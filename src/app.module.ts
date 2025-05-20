import { Module } from '@nestjs/common';
import { AttendanceModule } from './attendance/attendance.module';
import { DatabaseModule } from './infra/database/dabase.module';

@Module({
  imports: [AttendanceModule, DatabaseModule],
})
export class AppModule {}
