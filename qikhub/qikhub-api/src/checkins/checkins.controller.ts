import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CheckinsService } from './checkins.service';
import { CreateCheckInDto } from './dto/create-checkin.dto';
import { CheckOutDto } from './dto/checkout.dto';

@Controller('checkins')
export class CheckinsController {
  constructor(private readonly checkinsService: CheckinsService) {}

  @Post('check-in')
  checkIn(@Body() dto: CreateCheckInDto) {
    return this.checkinsService.checkIn(dto);
  }

  @Post('check-out')
  checkOut(@Body() dto: CheckOutDto) {
    return this.checkinsService.checkOut(dto);
  }

  @Get('event/:eventId')
  listByEvent(@Param('eventId') eventId: string) {
    return this.checkinsService.listByEvent(eventId);
  }

  @Get('participant/:participantId')
  listByParticipant(@Param('participantId') participantId: string) {
    return this.checkinsService.listByParticipant(participantId);
  }
}
