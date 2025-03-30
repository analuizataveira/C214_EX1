import { Injectable } from '@nestjs/common';
import { Schedule } from 'src/commom/types/schedules.type';
import { UpdateScheduleDto } from 'src/schedules/dto/update-schedule.dto';

@Injectable()
export class StorageService {
  private schedule: Schedule[] = [];
  private user: { email: string; password: string }[] = [];

  getAllSchedules(): Schedule[] {
    return this.schedule;
  }

  addSchedule(item: Schedule) {
    this.schedule.push(item);
    return item;
  }

  updateSchedule(id: number, item: UpdateScheduleDto) {
    this.schedule.forEach((sch, index) => {
      if (sch.id === id) {
        this.schedule[index] = item as Schedule;
      }
    });

    return this.schedule.find((sch) => sch.id === id);
  }

  removeSchedule(id: number) {
    return this.schedule.filter((item) => item.id !== id);
  }

  findSchedule(id: number) {
    return this.schedule.find((item) => item.id === id);
  }

  getAllUsers(): { email: string; password: string }[] {
    return this.user;
  }

  addUser(item: { email: string; password: string }) {
    this.user.push(item);
    return item;
  }

  removeUser(email: string) {
    this.user.filter((usr) => usr.email !== email);
    return 'User removed!';
  }

  findUser(email: string) {
    return this.user.find((usr) => usr.email === email);
  }

  updateUser(email: string, password: string) {
    this.user.forEach((usr, index) => {
      if (usr.email === email) {
        this.user[index].password = password;
      }
    });

    return this.user.find((usr) => usr.email === email);
  }
}
