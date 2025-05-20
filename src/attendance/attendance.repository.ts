import { Attendance } from 'src/attendance/attendance.entity';

export abstract class AttendanceRepository {
  abstract create(attendance: Attendance): Promise<void>;
  abstract findAll(): Promise<Attendance[]>;
}
