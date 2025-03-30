import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesService } from '../schedules.service';
import { StorageService } from '../../local-db/local-db.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('SchedulesService', () => {
  let service: SchedulesService;
  let storageServiceMock: Partial<StorageService>;

  beforeEach(async () => {
    storageServiceMock = {
      getAllSchedules: jest.fn(),
      addSchedule: jest.fn(),
      findSchedule: jest.fn(),
      removeSchedule: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulesService,
        { provide: StorageService, useValue: storageServiceMock },
      ],
    }).compile();

    service = module.get<SchedulesService>(SchedulesService);
    storageServiceMock = module.get<StorageService>(StorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw BadRequestException if schedule already exists', () => {
      const createScheduleDto = {
        id: 1,
        diaDeAtendimento: 'Tuesday',
        predio: 1,
        sala: 4,
        nomeDoProfessor: 'John Doe',
        horarioDeAtendimento: '10:00-12:00',
        periodo: 'Morning',
      };
      jest.spyOn(storageServiceMock, 'getAllSchedules').mockReturnValue([
        {
          id: 1,
          diaDeAtendimento: 'Tuesday',
          predio: 1,
          sala: 4,
          nomeDoProfessor: 'John Doe',
          horarioDeAtendimento: '10:00-12:00',
          periodo: 'Morning',
        },
      ]);

      expect(() => service.create(createScheduleDto)).toThrow(
        BadRequestException,
      );
    });

    it('should add a new schedule if no conflict exists', () => {
      const createScheduleDto = {
        id: 1,
        diaDeAtendimento: 'Tuesday',
        predio: 1,
        sala: 4,
        nomeDoProfessor: 'John Doe',
        horarioDeAtendimento: '10:00-12:00',
        periodo: 'Morning',
      };
      jest.spyOn(storageServiceMock, 'getAllSchedules').mockReturnValue([]);
      jest
        .spyOn(storageServiceMock, 'addSchedule')
        .mockReturnValue(createScheduleDto);

      const result = service.create(createScheduleDto);

      expect(result).toEqual(createScheduleDto);
      expect(storageServiceMock.addSchedule).toHaveBeenCalledWith(
        createScheduleDto,
      );
    });

    it('should throw BadRequestException if sala does not match predio', () => {
      const createScheduleDto = {
        id: 1,
        diaDeAtendimento: 'Monday',
        predio: 2, // Incorrect building for room 3
        sala: 3,
        nomeDoProfessor: 'John Doe',
        horarioDeAtendimento: '10:00-12:00',
        periodo: 'Morning',
      };

      expect(() => service.create(createScheduleDto)).toThrow(
        new BadRequestException('Rooms 1-5 must belong to building 1'),
      );
    });

    it('should create a schedule if sala matches predio', () => {
      const createScheduleDto = {
        id: 1,
        diaDeAtendimento: 'Monday',
        predio: 1, // Correct building for room 3
        sala: 3,
        nomeDoProfessor: 'John Doe',
        horarioDeAtendimento: '10:00-12:00',
        periodo: 'Morning',
      };
      jest.spyOn(storageServiceMock, 'getAllSchedules').mockReturnValue([]);
      jest
        .spyOn(storageServiceMock, 'addSchedule')
        .mockReturnValue(createScheduleDto);

      const result = service.create(createScheduleDto);

      expect(result).toEqual(createScheduleDto);
      expect(storageServiceMock.addSchedule).toHaveBeenCalledWith(
        createScheduleDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return all schedules', () => {
      const schedules = [
        {
          id: 1,
          diaDeAtendimento: 'Monday',
          predio: 1,
          sala: 3,
          nomeDoProfessor: 'Jane Doe',
          horarioDeAtendimento: '09:00-11:00',
          periodo: 'Morning',
        },
        {
          id: 2,
          diaDeAtendimento: 'Tuesday',
          predio: 1,
          sala: 2,
          nomeDoProfessor: 'John Smith',
          horarioDeAtendimento: '14:00-16:00',
          periodo: 'Afternoon',
        },
      ];
      jest
        .spyOn(storageServiceMock, 'getAllSchedules')
        .mockReturnValue(schedules);

      const result = service.findAll();

      expect(result).toEqual(schedules);
      expect(storageServiceMock.getAllSchedules).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a schedule by id', () => {
      const schedule = {
        id: 2,
        diaDeAtendimento: 'Tuesday',
        predio: 1,
        sala: 2,
        nomeDoProfessor: 'John Smith',
        horarioDeAtendimento: '14:00-16:00',
        periodo: 'Afternoon',
      };
      jest.spyOn(storageServiceMock, 'findSchedule').mockReturnValue(schedule);

      const result = service.findOne(1);

      expect(result).toEqual(schedule);
      expect(storageServiceMock.findSchedule).toHaveBeenCalledWith(1);
    });

    it('should throw an error if schedule does not exist', () => {
      jest.spyOn(storageServiceMock, 'findSchedule').mockReturnValue(undefined);

      expect(() => service.findOne(1)).toThrow(
        new NotFoundException('Schedule does not exist'),
      );
    });
  });

  describe('remove', () => {
    it('should remove a schedule by id', () => {
      const schedule = {
        id: 1,
        diaDeAtendimento: 'Tuesday',
        predio: 1,
        sala: 2,
        nomeDoProfessor: 'John Smith',
        horarioDeAtendimento: '14:00-16:00',
        periodo: 'Afternoon',
      };
      jest.spyOn(storageServiceMock, 'removeSchedule').mockReturnValue([]);
      jest.spyOn(storageServiceMock, 'findSchedule').mockReturnValue(schedule);

      const result = service.remove(1);

      expect(result).toBe('Schedule removed');
      expect(storageServiceMock.removeSchedule).toHaveBeenCalledWith(1);
    });

    it('should throw an error if schedule does not exist', () => {
      jest.spyOn(storageServiceMock, 'findSchedule').mockReturnValue(undefined);

      expect(() => service.remove(1)).toThrow(
        new NotFoundException('Schedule not found'),
      );
    });
  });
});
