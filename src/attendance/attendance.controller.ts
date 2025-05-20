import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
} from '@nestjs/common';
import { CreateAttendanceService } from './attendance.service';
import { Attendance } from './attendance.entity';

@Controller()
export class AttendanceController {
  constructor(private readonly service: CreateAttendanceService) {}

  @Post('/attendance')
  async createAttendance(@Body() attendance: Attendance): Promise<Attendance> {
    console.log(attendance);
    this.validateData(attendance);

    return this.service.createAttendance(attendance);
  }

  @Get('/attendance')
  async getAllAttendances(): Promise<Attendance[]> {
    return this.service.getAllAttendances();
  }

  private validateData(attendance: Attendance) {
    let errors: string[] = [];

    if (!attendance.name) {
      errors = errors.concat('attendance must have name');
    }
    if (!attendance.description) {
      errors = errors.concat('attendance must have description');
    }
    if (!attendance.address) {
      errors = errors.concat('attendance must have address');
    }
    if (!attendance.phone) {
      errors.push('attendance must have phone');
    }
    if (errors.length) {
      throw new BadRequestException(errors.toString(), {
        cause: new Error(),
        description: 'InvalidParamsError',
      });
    }
  }
}
