import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private notificationService: ClientProxy,
  ) {}
  async ping() {
    return this.notificationService.send('hello', {});
  }

  async create(createNotificationDto: CreateNotificationDto) {
    return this.notificationService.send('create', createNotificationDto);
  }

  async findAll(args?: any) {
    return this.notificationService.send('findAll', args);
  }

  async findOne(id: number, args?: any) {
    return this.notificationService.send('findOne', { id, args });
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.send('update', {
      id,
      updateNotificationDto,
    });
  }

  async remove(id: number) {
    return this.notificationService.send('remove', id);
  }
}
