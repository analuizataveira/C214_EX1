import { Injectable } from '@nestjs/common';
import { Schedule } from 'src/commom/types/schedules.type';

@Injectable()
export class StorageService {
  private schedule: Schedule[] = [];
  private user: { email: string; password: string }[] = [];

  getAllSchedule(): Schedule[] {
    return this.schedule;
  }

  addSchedule(item: Schedule) {
    this.schedule.push(item);
    return item;
  }

  removeSchedule(id: number) {
    this.schedule.filter((item) => item.id !== id);
  }

  findSchedule(id: number) {
    this.schedule.filter((item) => item.id === id);
  }

  getAllUsers(): { email: string; password: string }[] {
    return this.user;
  }

  addUser(item: { email: string; password: string }): void {
    this.user.push(item);
  }

  removeUser(email: string) {
    this.user.filter((usr) => usr.email !== email);
  }

  findUser(email: string) {
    this.user.filter((usr) => usr.email === email);
  }
}
