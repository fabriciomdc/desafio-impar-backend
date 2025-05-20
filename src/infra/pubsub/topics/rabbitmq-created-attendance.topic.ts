import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { Attendance } from 'src/attendance/attendance.entity';
import { CreatedAttendanceTopic } from 'src/attendance/topics/created-attendances.topic';

@Injectable()
export class RabbitmqCreatedAttendanceTopic implements CreatedAttendanceTopic {
  constructor(private readonly amqpConnection: AmqpConnection) {}
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async publish(attendance: Attendance): Promise<void> {
    await this.amqpConnection.publish('attendances', 'attendances.created', {
      attendance,
    });
  }
}
