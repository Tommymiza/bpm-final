import { Module } from '@nestjs/common';
import { AuthServiceClientModule } from 'src/auth-client/auth-client.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [AuthServiceClientModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
