import { Attendance } from 'src/attendance/attendance.entity';
import { sql } from 'src/infra/database/database.provider';
import { AttendanceRepository } from 'src/attendance/attendance.repository';

export class PostgresAttendanceRepository implements AttendanceRepository {
  async create(data: Attendance) {
    await sql`insert into attendances (id, name, phone, address, description, createdAt)
    values (${data.id}, ${data.name}, ${data.phone}, ${data.address}, ${data.description}, ${data.createdAt})`;
  }

  async findAll(): Promise<Attendance[]> {
    const result = await sql<Attendance[]>`select * from attendances`;
    return result;
  }
}
