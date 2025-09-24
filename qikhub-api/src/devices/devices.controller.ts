import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DevicePingDto } from './dto/ping.dto';

@ApiTags('devices')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  @ApiOperation({ summary: 'List devices' })
  @ApiQuery({ name: 'ownerId', required: false })
  @ApiQuery({ name: 'eventId', required: false })
  findAll(@Query('ownerId') ownerId?: string, @Query('eventId') eventId?: string) {
    return this.devicesService.findAll({ ownerId, eventId });
  }

  @Get('owner/:ownerId')
  @ApiOperation({ summary: 'List devices by owner' })
  findByOwner(@Param('ownerId') ownerId: string) {
    return this.devicesService.findByOwner(ownerId);
  }

  @Get('event/:eventId')
  @ApiOperation({ summary: 'List devices by event' })
  findByEvent(@Param('eventId') eventId: string) {
    return this.devicesService.findByEvent(eventId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a device by id' })
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a device' })
  create(@Body() dto: CreateDeviceDto) {
    return this.devicesService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a device' })
  update(@Param('id') id: string, @Body() dto: UpdateDeviceDto) {
    return this.devicesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a device' })
  remove(@Param('id') id: string) {
    return this.devicesService.remove(id);
  }

  @Post(':id/assign-event')
  @ApiOperation({ summary: 'Assign a device to an event' })
  assignEvent(@Param('id') id: string, @Body('eventId') eventId: string) {
    return this.devicesService.assignEvent(id, eventId);
  }

  @Post(':id/unassign-event')
  @ApiOperation({ summary: 'Unassign a device from an event' })
  unassignEvent(@Param('id') id: string) {
    return this.devicesService.unassignEvent(id);
  }

  @Post(':id/ping')
  @ApiOperation({ summary: 'Device health ping (updates telemetry and lastSeen)' })
  @ApiResponse({ status: 201, description: 'Ping accepted; device updated' })
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  ping(@Param('id') id: string, @Body() dto: DevicePingDto) {
    return this.devicesService.ping(id, dto);
  }
}
