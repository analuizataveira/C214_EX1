import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { StorageService } from '../local-db/local-db.service';

@Injectable()
export class AuthService {
  constructor(private readonly storageService: StorageService) {}

  signup({ email, password }: CreateAuthDto) {
    const user = this.storageService.findUser(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    return this.storageService.addUser({ email, password });
  }

  singin({ email, password }: CreateAuthDto) {
    const user = this.storageService.findUser(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (password !== user.password) {
      throw new BadRequestException('Password does not match');
    }

    return user;
  }

  findAll() {
    return this.storageService.getAllUsers();
  }

  findOne(email: string) {
    return this.storageService.findUser(email);
  }

  update(email: string, password: string) {
    const user = this.storageService.findUser(email);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return this.storageService.updateUser(email, password);
  }

  remove(email: string) {
    return this.storageService.removeUser(email);
  }
}
