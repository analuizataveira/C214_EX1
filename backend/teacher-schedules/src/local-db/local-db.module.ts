import { Module } from '@nestjs/common';
import { StorageService } from './local-db.service';

@Module({
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
