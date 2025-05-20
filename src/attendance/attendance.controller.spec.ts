import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceController } from './attendance.controller';
import { CreateAttendanceService } from './attendance.service';
import { Attendance } from './attendance.entity';
import { randomUUID } from 'crypto';
import { AttendanceRepository } from './attendance.repository';

const makeAttendance = (): Attendance => ({
  id: randomUUID(),
  name: 'John Doe',
  address: '123 Main St',
  description: 'Some description',
  phone: '999999999',
  createdAt: new Date(),
});

const makeAttendanceRepositoryStub = (): jest.Mocked<AttendanceRepository> => ({
  create: jest.fn().mockResolvedValue(undefined),
  findAll: jest
    .fn()
    .mockResolvedValue([makeAttendance(), makeAttendance(), makeAttendance()]),
});

const makeAttendanceServiceStub = (): CreateAttendanceService => {
  const attendanceRepository = makeAttendanceRepositoryStub();
  return new CreateAttendanceService(attendanceRepository);
};

const makeSut = async () => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [AttendanceController],
    providers: [
      {
        provide: CreateAttendanceService,
        useFactory: () => makeAttendanceServiceStub(),
      },
    ],
  }).compile();

  const sut = module.get<AttendanceController>(AttendanceController);
  const service = module.get<CreateAttendanceService>(CreateAttendanceService);
  return { sut, service };
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('AttendanceController', () => {
  describe('createAttendance', () => {
    describe('should create Attendance', () => {
      it('atendimento criado com sucesso', async () => {
        const { sut, service } = await makeSut();
        const input = makeAttendance();

        const createAttendance = jest
          .spyOn(service, 'createAttendance')
          .mockResolvedValueOnce(input);

        const result = await sut.createAttendance(input);

        expect(result).toEqual(input);
        expect(createAttendance).toHaveBeenCalledWith(input);
      });
    });

    describe('should not create Attendance', () => {
      it('when invalid params is provided', async () => {
        const { sut, service } = await makeSut();
        const input = makeAttendance();

        jest
          .spyOn(service, 'createAttendance')
          .mockRejectedValueOnce(new Error('Parâmetros inválidos'));

        await expect(sut.createAttendance(input)).rejects.toThrow(
          'Parâmetros inválidos',
        );
      });

      it('should throw if service fails', async () => {
        const { sut, service } = await makeSut();
        const input = makeAttendance();

        jest
          .spyOn(service, 'createAttendance')
          .mockRejectedValueOnce(new Error('service error'));

        await expect(sut.createAttendance(input)).rejects.toThrow(
          'service error',
        );
      });
    });
  });
});
