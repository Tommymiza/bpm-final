import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('create')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern('findAll')
  findAll(@Payload() { args }: any) {
    return this.userService.findAll(args);
  }

  @MessagePattern('findOne')
  findOne(@Payload() { id, args }: { id: number; args?: any }) {
    return this.userService.findOne(id, args);
  }

  @MessagePattern('update')
  update(
    @Payload()
    { id, updateUserDto }: { id: number; updateUserDto: UpdateUserDto },
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @MessagePattern('updateCompany')
  updateCompany(
    @Payload()
    { userId, companyId }: { userId: number; companyId: number },
  ) {
    return this.userService.updateCompany({ userId, companyId });
  }

  @MessagePattern('remove')
  remove(@Payload() id: number) {
    return this.userService.remove(id);
  }
}
