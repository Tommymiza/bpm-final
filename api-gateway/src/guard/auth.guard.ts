import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/decorator/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger();
  constructor(
    @Inject('AUTH_SERVICE') private authServiceClient: ClientProxy,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    try {
      const token = req.headers['authorization']?.split(' ')[1];
      if (!token) return false;
      const user = await lastValueFrom(
        this.authServiceClient.send('check', { token }),
      );
      if (!user) return false;
      delete user.password;
      req.jwtToken = token;
      req.user = user;
      return true;
    } catch (error) {
      this.logger.error(error, AuthGuard.name);
    }
    return false;
  }
}
