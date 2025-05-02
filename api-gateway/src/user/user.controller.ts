import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserPayload } from 'src/auth/auth.controller';
import { Public } from 'src/decorator/public.decorator';
import { User } from 'src/decorator/user.decorator';
import { HelperService } from 'src/helper/helper.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly helper: HelperService,
  ) {}

  @Public()
  @Get('ping')
  ping() {
    return this.userService.ping();
  }

  @Post()
  @ApiBearerAuth()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiQuery({ name: 'args', required: false })
  findAll(@Query() { args }: any) {
    return this.userService.findAll(this.helper.parsePrismaArgs(args));
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiQuery({ name: 'args', required: false })
  findOne(@Param('id') id: string, @Query() { args }: any) {
    return this.userService.findOne(+id, this.helper.parsePrismaArgs(args));
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Post('update-company')
  @ApiBearerAuth()
  updateCompany(@Body() body: UpdateCompanyDto, @User() user: UserPayload) {
    return this.userService.updateCompany({ user: user, ...body });
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
