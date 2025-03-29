import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { StorageService } from 'src/local-db/local-db.service';

@Injectable()
export class AuthService {
  constructor(private readonly storageService: StorageService) {}

  create(createAuthDto: CreateAuthDto) {
    return this.storageService.addUser(createAuthDto);
  }

  findAll() {
    return this.storageService.getAllUsers();
  }

  findOne(email: string) {
    return this.storageService.findUser(email);
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return this.storageService.getAllUsers();
  }

  remove(email: string) {
    return this.storageService.removeUser(email);
  }
}
