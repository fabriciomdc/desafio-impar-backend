import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HandleSendAttendanceWhatsappMessage {
  @RabbitRPC({
    exchange: 'attendances',
    routingKey: 'attendances.created',
    queue: 'send-attendance-whatsapp-message-queue',
  })
  async handle(message: any) {
    console.log('message => :', message);
  }
}
