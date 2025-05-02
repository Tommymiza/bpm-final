import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthServiceClientModule } from './auth-client/auth-client.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './guard/auth.guard';
import { HelperModule } from './helper/helper.module';
import { NotificationServiceClientModule } from './notification-client/notification-client.module';
import { NotificationModule } from './notification/notification.module';
import { UserServiceClientModule } from './user-service/user-service.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    HelperModule,
    NotificationServiceClientModule,
    AuthServiceClientModule,
    UserServiceClientModule,
    UserModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
