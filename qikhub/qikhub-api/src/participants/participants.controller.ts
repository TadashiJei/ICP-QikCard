import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@ApiTags('participants')
@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all participants' })
  @ApiResponse({ status: 200, description: 'List of participants retrieved successfully' })
  findAll() {
    return this.participantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get participant by ID' })
  @ApiParam({ name: 'id', description: 'Participant ID' })
  @ApiResponse({ status: 200, description: 'Participant retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Participant not found' })
  findOne(@Param('id') id: string) {
    return this.participantsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new participant' })
  @ApiResponse({ status: 201, description: 'Participant created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'Participant already exists for this event' })
  create(@Body() dto: CreateParticipantDto) {
    return this.participantsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update participant by ID' })
  @ApiParam({ name: 'id', description: 'Participant ID' })
  @ApiResponse({ status: 200, description: 'Participant updated successfully' })
  @ApiResponse({ status: 404, description: 'Participant not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  update(@Param('id') id: string, @Body() dto: UpdateParticipantDto) {
    return this.participantsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete participant by ID' })
  @ApiParam({ name: 'id', description: 'Participant ID' })
  @ApiResponse({ status: 200, description: 'Participant deleted successfully' })
  @ApiResponse({ status: 404, description: 'Participant not found' })
  remove(@Param('id') id: string) {
    return this.participantsService.remove(id);
  }
}
