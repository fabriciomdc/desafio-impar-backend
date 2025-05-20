import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Module } from '@nestjs/common';
import { HandleSendAttendanceWhatsappMessage } from './handle-send-attendance-whatsapp-message';
import { RabbitmqCreatedAttendanceTopic } from './topics/rabbitmq-created-attendance.topic';
import { CreatedAttendanceTopic } from 'src/attendance/topics/created-attendances.topic';

@Global()
@Module({
  imports: [
    RabbitMQModule.forRoot({
      exchanges: [
        {
          name: 'attendances',
          type: 'topic',
        },
      ],
      uri: 'amqp://desafio-impar-rabbit:rabbit@localhost:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  providers: [
    HandleSendAttendanceWhatsappMessage,
    {
      provide: CreatedAttendanceTopic,
      useClass: RabbitmqCreatedAttendanceTopic,
    },
  ],
  exports: [CreatedAttendanceTopic],
})
export class PubSubModule {}
