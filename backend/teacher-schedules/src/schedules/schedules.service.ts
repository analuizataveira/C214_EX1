import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { StorageService } from 'src/local-db/local-db.service';

@Injectable()
export class SchedulesService {
  constructor(private readonly storageService: StorageService) {}
  // TODO: Validate if schedule of day/time and check if room is already signed to a professor;
  create(createScheduleDto: CreateScheduleDto) {
    return this.storageService.addSchedule(createScheduleDto);
  }

  findAll() {
    return this.storageService.getAllSchedule();
  }

  findOne(id: number) {
    return this.storageService.findSchedule(id);
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return this.storageService.removeSchedule(id);
  }
}
