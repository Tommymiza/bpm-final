import { Module } from '@nestjs/common';
import { NotificationServiceClientModule } from 'src/notification-client/notification-client.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  imports: [NotificationServiceClientModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
