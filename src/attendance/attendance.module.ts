import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { CreateAttendanceService } from './create-attendance.service';

@Module({
  controllers: [AttendanceController],
  providers: [CreateAttendanceService],
})
export class AttendanceModule {}
