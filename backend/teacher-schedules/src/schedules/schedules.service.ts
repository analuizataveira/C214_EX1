import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { StorageService } from '../local-db/local-db.service';

@Injectable()
export class SchedulesService {
  constructor(private readonly storageService: StorageService) {}
  create(createScheduleDto: CreateScheduleDto) {
    const { sala, predio } = createScheduleDto;

    if (sala >= 1 && sala <= 5 && predio !== 1) {
      throw new BadRequestException('Rooms 1-5 must belong to building 1');
    } else if (sala >= 6 && sala <= 10 && predio !== 2) {
      throw new BadRequestException('Rooms 6-10 must belong to building 2');
    } else if (sala >= 11 && sala <= 15 && predio !== 3) {
      throw new BadRequestException('Rooms 11-15 must belong to building 3');
    } else if (sala >= 16 && sala <= 20 && predio !== 4) {
      throw new BadRequestException('Rooms 16-20 must belong to building 4');
    } else if (sala >= 21 && sala <= 25 && predio !== 5) {
      throw new BadRequestException('Rooms 21-25 must belong to building 5');
    } else if (sala >= 26 && sala <= 30 && predio !== 6) {
      throw new BadRequestException('Rooms 26-30 must belong to building 6');
    }

    const schedulesOnBuilding = this.storageService.getAllSchedules();

    const alreadyScheduled = schedulesOnBuilding.find((schedule) => {
      if (
        schedule.diaDeAtendimento === createScheduleDto.diaDeAtendimento &&
        schedule.predio === createScheduleDto.predio &&
        schedule.sala === createScheduleDto.sala
      ) {
        return schedule;
      }
    });

    if (alreadyScheduled) {
      throw new BadRequestException('A professor already scheduled this room');
    }

    return this.storageService.addSchedule(createScheduleDto);
  }

  findAll() {
    return this.storageService.getAllSchedules();
  }

  findOne(id: number) {
    const schedule = this.storageService.findSchedule(id);
    if (!schedule) {
      throw new NotFoundException('Schedule does not exist');
    }
    return schedule;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    const schedule = this.storageService.findSchedule(id);

    if (!schedule) {
      throw new NotFoundException('Schedule not found!');
    }

    return this.storageService.updateSchedule(id, updateScheduleDto);
  }

  remove(id: number) {
    const schedule = this.storageService.findSchedule(id);

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    this.storageService.removeSchedule(id);

    return 'Schedule removed';
  }
}
