import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorator/public.decorator';
import { User } from 'src/decorator/user.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

export type UserPayload = {
  id: number;
  role: 'RH' | 'CLIENT' | 'COMPANY';
  email: string;
  name: string;
  companyId: number;
};

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @ApiBearerAuth()
  check(@User() user: UserPayload) {
    return this.authService.check(user);
  }
}
