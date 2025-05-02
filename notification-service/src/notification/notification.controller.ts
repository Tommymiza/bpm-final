import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern('create')
  create(@Payload() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @MessagePattern('findAll')
  findAll(@Payload() { args }: any) {
    return this.notificationService.findAll(args);
  }

  @MessagePattern('findOne')
  findOne(@Payload() { id, args }: { id: number; args?: any }) {
    return this.notificationService.findOne(id, args);
  }

  @MessagePattern('update')
  update(
    @Payload()
    {
      id,
      updateNotificationDto,
    }: {
      id: number;
      updateNotificationDto: UpdateNotificationDto;
    },
  ) {
    return this.notificationService.update(id, updateNotificationDto);
  }

  @MessagePattern('remove')
  remove(@Payload() id: number) {
    return this.notificationService.remove(id);
  }
}
