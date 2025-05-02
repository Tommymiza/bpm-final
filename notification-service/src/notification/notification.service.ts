import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createNotificationDto: Prisma.NotificationUncheckedCreateInput) {
    try {
      const notification = await this.prisma.notification.create({
        data: {
          ...createNotificationDto,
        },
      });
      return notification;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findAll(args?: Prisma.NotificationFindManyArgs) {
    return this.prisma.notification.findMany(args);
  }

  async findOne(id: number, args?: Prisma.NotificationFindUniqueArgs) {
    try {
      const notification = await this.prisma.notification.findMany({
        where: { userId: id },
        ...args,
      });
      return notification;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async update(
    id: number,
    updateNotificationDto: Prisma.NotificationUncheckedUpdateInput,
  ) {
    try {
      const notification = await this.prisma.notification.update({
        where: { id },
        data: updateNotificationDto,
      });
      return notification;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const notification = await this.prisma.notification.delete({
        where: { id },
      });
      return notification;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
