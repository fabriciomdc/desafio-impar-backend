import { Global, Module } from '@nestjs/common';
import { AttendanceRepository } from 'src/attendance/attendance.repository';
import { PostgresAttendanceRepository } from './repositories/postgres-attendance.repository';

@Global()
@Module({
  providers: [
    {
      provide: AttendanceRepository,
      useClass: PostgresAttendanceRepository,
    },
  ],
  exports: [AttendanceRepository],
})
export class DatabaseModule {}
