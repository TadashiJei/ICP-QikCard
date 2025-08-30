import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiOkResponse } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { EventFilterDto } from '../common/dto/filter.dto';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all events with pagination and filtering' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, example: 20 })
  @ApiQuery({ name: 'search', required: false, description: 'Search in name and description' })
  @ApiQuery({ name: 'status', required: false, enum: ['DRAFT', 'ACTIVE', 'ONGOING', 'COMPLETED', 'CANCELLED'] })
  @ApiQuery({ name: 'organizerId', required: false, description: 'Filter by organizer ID' })
  @ApiQuery({ name: 'startDateFrom', required: false, description: 'Filter events starting from this date (ISO string)' })
  @ApiQuery({ name: 'startDateTo', required: false, description: 'Filter events starting until this date (ISO string)' })
  @ApiQuery({ name: 'sortBy', required: false, example: 'startDate' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiOkResponse({
    description: 'Paginated events list',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'array', items: { type: 'object' } },
        total: { type: 'number' },
        page: { type: 'number' },
        pageSize: { type: 'number' },
        totalPages: { type: 'number' },
      },
    },
  })
  findAll(
    @Query() pagination: PaginationDto,
    @Query() filters: EventFilterDto,
  ) {
    return this.eventsService.findAllPaginated(pagination, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get event by ID' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Event retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: 201, description: 'Event created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update event by ID' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Event updated successfully' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete event by ID' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Event deleted successfully' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
