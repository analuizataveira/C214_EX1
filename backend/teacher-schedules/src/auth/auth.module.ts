import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StorageModule } from 'src/local-db/local-db.module';

@Module({
  imports: [StorageModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
