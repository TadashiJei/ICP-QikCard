import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CheckinsService } from './checkins.service';
import { CreateCheckInDto } from './dto/create-checkin.dto';
import { CheckOutDto } from './dto/checkout.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('checkins')
@Controller('checkins')
export class CheckinsController {
  constructor(private readonly checkinsService: CheckinsService) {}

  @Post('check-in')
  @ApiOperation({ summary: 'Create a check-in' })
  checkIn(@Body() dto: CreateCheckInDto) {
    return this.checkinsService.checkIn(dto);
  }

  @Post('check-out')
  @ApiOperation({ summary: 'Complete an open check-in or create an immediate checkout record' })
  checkOut(@Body() dto: CheckOutDto) {
    return this.checkinsService.checkOut(dto);
  }

  @Get('event/:eventId')
  @ApiOperation({ summary: 'List check-ins by event with pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, example: 20 })
  listByEvent(
    @Param('eventId') eventId: string,
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '20',
  ) {
    const pageNum = Math.max(parseInt(page as string, 10) || 1, 1);
    const sizeNum = Math.min(Math.max(parseInt(pageSize as string, 10) || 20, 1), 100);
    return this.checkinsService.listByEvent(eventId, pageNum, sizeNum);
  }

  @Get('participant/:participantId')
  @ApiOperation({ summary: 'List check-ins by participant with pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, example: 20 })
  listByParticipant(
    @Param('participantId') participantId: string,
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '20',
  ) {
    const pageNum = Math.max(parseInt(page as string, 10) || 1, 1);
    const sizeNum = Math.min(Math.max(parseInt(pageSize as string, 10) || 20, 1), 100);
    return this.checkinsService.listByParticipant(participantId, pageNum, sizeNum);
  }
}
