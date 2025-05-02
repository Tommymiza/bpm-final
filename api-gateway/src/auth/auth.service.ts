import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserPayload } from './auth.controller';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private authService: ClientProxy) {}
  login(loginDto: LoginDto) {
    try {
      return this.authService.send('login', loginDto);
    } catch (error) {
      throw error;
    }
  }

  check(user: UserPayload) {
    return user;
  }
}
