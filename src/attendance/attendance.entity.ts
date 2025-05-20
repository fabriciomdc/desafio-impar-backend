import { uuidv7 } from 'uuidv7';

type AttendanceInput = Omit<Attendance, 'id' | 'createdAt'> & {
  id?: string;
  createdAt?: Date;
};

export class Attendance {
  constructor(attendance: AttendanceInput) {
    Object.assign(this, {
      ...attendance,
      id: attendance.id ?? uuidv7(),
      createdAt: attendance.createdAt ?? new Date(),
    });
  }

  id: string;
  description: string;
  name: string;
  address: string;
  phone: string;
  createdAt: Date;
}
