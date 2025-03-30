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
    const { room, building } = createScheduleDto;

    if (room >= 1 && room <= 5 && building !== 1) {
      throw new BadRequestException('Rooms 1-5 must belong to building 1');
    } else if (room >= 6 && room <= 10 && building !== 2) {
      throw new BadRequestException('Rooms 6-10 must belong to building 2');
    } else if (room >= 11 && room <= 15 && building !== 3) {
      throw new BadRequestException('Rooms 11-15 must belong to building 3');
    } else if (room >= 16 && room <= 20 && building !== 4) {
      throw new BadRequestException('Rooms 16-20 must belong to building 4');
    } else if (room >= 21 && room <= 25 && building !== 5) {
      throw new BadRequestException('Rooms 21-25 must belong to building 5');
    } else if (room >= 26 && room <= 30 && building !== 6) {
      throw new BadRequestException('Rooms 26-30 must belong to building 6');
    }

    const schedulesOnBuilding = this.storageService.getAllSchedules();

    const alreadyScheduled = schedulesOnBuilding.find((schedule) => {
      if (
        schedule.dayOfService === createScheduleDto.dayOfService &&
        schedule.building === createScheduleDto.building &&
        schedule.room === createScheduleDto.room
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
