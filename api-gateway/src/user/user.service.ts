import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserPayload } from 'src/auth/auth.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private logger = new Logger();
  constructor(@Inject('USER_SERVICE') private userService: ClientProxy) {}
  async ping() {
    return this.userService.send('hello', {});
  }

  async create(createUserDto: CreateUserDto) {
    return this.userService.send('create', createUserDto);
  }

  async findAll(args?: any) {
    return this.userService.send('findAll', args);
  }

  async findOne(id: number, args?: any) {
    return this.userService.send('findOne', { id, args });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userService.send('update', { id, updateUserDto });
  }

  async updateCompany({
    user,
    userId,
    companyId,
  }: {
    user: UserPayload;
    userId: number;
    companyId: number;
  }) {
    if (user.role !== 'RH') {
      this.logger.error(
        'User not authorized to update company',
        UserService.name,
      );
      throw new UnauthorizedException('User not authorized to update company');
    }
    return this.userService.send('updateCompany', {
      userId: +userId,
      companyId: +companyId,
    });
  }

  async remove(id: number) {
    return this.userService.send('remove', id);
  }
}
