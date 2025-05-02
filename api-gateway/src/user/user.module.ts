import { Module } from '@nestjs/common';
import { UserServiceClientModule } from 'src/user-service/user-service.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [UserServiceClientModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
