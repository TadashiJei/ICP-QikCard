import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DevicePingDto } from './dto/ping.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  findAll(@Query('ownerId') ownerId?: string, @Query('eventId') eventId?: string) {
    return this.devicesService.findAll({ ownerId, eventId });
  }

  @Get('owner/:ownerId')
  findByOwner(@Param('ownerId') ownerId: string) {
    return this.devicesService.findByOwner(ownerId);
  }

  @Get('event/:eventId')
  findByEvent(@Param('eventId') eventId: string) {
    return this.devicesService.findByEvent(eventId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDeviceDto) {
    return this.devicesService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDeviceDto) {
    return this.devicesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicesService.remove(id);
  }

  @Post(':id/assign-event')
  assignEvent(@Param('id') id: string, @Body('eventId') eventId: string) {
    return this.devicesService.assignEvent(id, eventId);
  }

  @Post(':id/unassign-event')
  unassignEvent(@Param('id') id: string) {
    return this.devicesService.unassignEvent(id);
  }

  @Post(':id/ping')
  ping(@Param('id') id: string, @Body() dto: DevicePingDto) {
    return this.devicesService.ping(id, dto);
  }
}
