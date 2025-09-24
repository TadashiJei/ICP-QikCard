import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiOkResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UserFilterDto } from '../common/dto/filter.dto';
import { BulkOperationDto, BulkDeleteDto } from '../common/dto/bulk.dto';
import { AuditInterceptor } from '../common/interceptors/audit.interceptor';
import { AuditLog } from '../common/decorators/audit.decorator';

@ApiTags('users')
@Controller('users')
@UseInterceptors(AuditInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users with pagination and filtering' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, example: 20 })
  @ApiQuery({ name: 'search', required: false, description: 'Search in displayName and email' })
  @ApiQuery({ name: 'role', required: false, enum: ['USER', 'ORGANIZER', 'ADMIN'] })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  @ApiQuery({ name: 'sortBy', required: false, example: 'createdAt' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiOkResponse({
    description: 'Paginated users list',
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
    @Query() filters: UserFilterDto,
  ) {
    return this.usersService.findAllPaginated(pagination, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  @AuditLog({ action: 'CREATE', resource: 'USER', includeBody: true, includeResult: true })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @AuditLog({ action: 'UPDATE', resource: 'USER', includeBody: true, includeResult: true })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @AuditLog({ action: 'DELETE', resource: 'USER' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Create multiple users' })
  @ApiResponse({ status: 201, description: 'Bulk user creation completed' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @AuditLog({ action: 'BULK_CREATE', resource: 'USER', includeBody: true, includeResult: true })
  bulkCreate(@Body() dto: BulkOperationDto<CreateUserDto>) {
    return this.usersService.bulkCreate(dto.items);
  }

  @Delete('bulk')
  @ApiOperation({ summary: 'Delete multiple users' })
  @ApiResponse({ status: 200, description: 'Bulk user deletion completed' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @AuditLog({ action: 'BULK_DELETE', resource: 'USER', includeBody: true, includeResult: true })
  bulkDelete(@Body() dto: BulkDeleteDto) {
    return this.usersService.bulkDelete(dto.ids);
  }
}
