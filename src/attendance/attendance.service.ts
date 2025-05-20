import { Injectable } from '@nestjs/common';
import { Attendance } from './attendance.entity';
import { AttendanceRepository } from './attendance.repository';

interface CreateAttendanceServiceInput {
  name: string;
  phone: string;
  address: string;
  description: string;
  createdAt: Date;
}

@Injectable()
export class CreateAttendanceService {
  constructor(private readonly attendanceRepository: AttendanceRepository) {}

  async createAttendance(
    input: CreateAttendanceServiceInput,
  ): Promise<Attendance> {
    const { name, phone, address, description, createdAt } = input;
    const newAttendance = new Attendance({
      name,
      phone,
      address,
      description,
      createdAt,
    });

    await this.attendanceRepository.create(newAttendance);

    return newAttendance;
  }

  async getAllAttendances(): Promise<Attendance[]> {
    return this.attendanceRepository.findAll();
  }
}
