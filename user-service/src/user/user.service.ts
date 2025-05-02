import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('NOTIFICATION_SERVICE') private notificationService: ClientProxy,
  ) {}
  async create(createUserDto: Prisma.UserUncheckedCreateInput) {
    try {
      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashSync(createUserDto.password, 10),
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(args?: Prisma.UserFindManyArgs) {
    try {
      const users = await this.prisma.user.findMany(args);
      users.forEach((user) => delete user.password);
      return users;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: number, args?: Prisma.UserFindUniqueArgs) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
        ...args,
      });
      delete user.password;
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async update(id: number, updateUserDto: Prisma.UserUncheckedUpdateInput) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
      delete user.password;
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async updateCompany({
    userId,
    companyId,
  }: {
    userId: number;
    companyId: number;
  }) {
    try {
      const company = await this.prisma.user.findUnique({
        where: { id: companyId },
      });
      if (!company || company.role !== 'COMPANY') {
        throw new RpcException('Company not found');
      }
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user || user.role !== 'CLIENT') {
        throw new RpcException('User not found');
      }
      const userUpdated = await this.prisma.user.update({
        where: { id: userId },
        data: { companyId },
      });
      delete userUpdated.password;

      this.notificationService.emit('create', {
        userId,
        title: 'Company Updated',
        message: `Your company has been updated to ${company.name}`,
      });

      this.notificationService.emit('create', {
        userId: companyId,
        title: 'New User Added',
        message: `A new user has been added to your company: ${user.name} (${user.email}), at: ${new Date().toLocaleString()}`,
      });
      return userUpdated;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });
      delete user.password;
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
