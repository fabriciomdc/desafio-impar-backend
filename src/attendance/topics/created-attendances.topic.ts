import { Attendance } from '../attendance.entity';

export abstract class CreatedAttendanceTopic {
  abstract publish(attendance: Attendance): void;
}
