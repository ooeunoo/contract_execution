import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProvider } from './user.provider';
import { DatabaseModule } from '../app/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...userProvider, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
