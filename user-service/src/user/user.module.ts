import { Module } from '@nestjs/common';
import { NotificationServiceClientModule } from 'src/notification-client/notification-client.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [NotificationServiceClientModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
