import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorator/public.decorator';
import { HelperService } from 'src/helper/helper.service';
import { NotificationService } from './notification.service';

@Controller('notification')
@ApiTags('Notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly helper: HelperService,
  ) {}

  @Public()
  @Get('ping')
  ping() {
    return this.notificationService.ping();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiQuery({ name: 'args', required: false })
  findOne(@Param('id') id: string, @Query() { args }: any) {
    return this.notificationService.findOne(
      +id,
      this.helper.parsePrismaArgs(args),
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }
}
