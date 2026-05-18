import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ACTION } from 'src/configs/main.config';
import { CheckPermission } from 'src/core/decorators/check-permission.decorator';
import { UserReq } from 'src/core/decorators/user.decorator';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { CreateUsersDto, UpdateUsersDto } from './dto/users.dto';
import { UserReqData } from './interfaces/user-req.interface';
import { UsersService } from './users.service';

/**
 * Users controller
 * Handles all user-related HTTP endpoints
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create a new user
   * @param createUsersDto - User data
   * @param user - Current authenticated user
   * @returns Created user
   */
  @CheckPermission(ACTION.create)
  @HttpCode(200)
  @Post()
  create(@Body() createUsersDto: CreateUsersDto, @UserReq() user: UserReqData) {
    createUsersDto.nguoi_tao = user.id;
    createUsersDto.nguoi_cap_nhat = user.id;
    return this.usersService.create(createUsersDto);
  }

  /**
   * Get users for select options (dropdown)
   * No permission check - public endpoint
   * @param filters - Filter parameters
   * @returns Users formatted for select options
   */
  @HttpCode(200)
  @Get('options')
  findAllForSelectOptions(@Query() filters: any) {
    return this.usersService.findForSelectOptions(filters);
  }

  /**
   * Get all users with pagination
   * @param filters - Filter and pagination parameters
   * @returns Paginated user list
   */
  @CheckPermission(ACTION.index)
  @HttpCode(200)
  @Get()
  findAll(@Query() filters: FilterData) {
    return this.usersService.findAllWithPagination(filters);
  }

  /**
   * Get a single user by ID
   * @param id - User ID
   * @returns User entity
   */
  @CheckPermission(ACTION.show)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  /**
   * Update a user
   * @param id - User ID to update
   * @param updateUsersDto - Updated user data
   * @param user - Current authenticated user
   * @returns Updated user
   */
  @CheckPermission(ACTION.edit)
  @HttpCode(200)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsersDto: UpdateUsersDto,
    @UserReq() user: UserReqData,
  ) {
    updateUsersDto.nguoi_cap_nhat = user.id;
    return this.usersService.update(+id, updateUsersDto);
  }

  /**
   * Delete a user
   * @param id - User ID to delete
   * @returns Delete result
   */
  @CheckPermission(ACTION.delete)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @CheckPermission(ACTION.delete)
  @HttpCode(200)
  @Post('delete-many')
  async deleteMany(@Body() body) {
    return this.usersService.removeUsersFromRole(
      body.vai_tro_id,
      body.user_ids,
    );
  }
  @CheckPermission(ACTION.changePassword)
  @HttpCode(200)
  @Patch('change-password/:id')
  changePassword(@Param('id') id: string, @Body() body: { mat_khau: string }) {
    return this.usersService.changePassword(+id, body.mat_khau);
  }

  // Thêm nhiều người dùng vào vai trò
  @CheckPermission(ACTION.edit)
  @HttpCode(200)
  @Post('add-many-to-role')
  async addManyUsersToRole(@Body() body) {
    return this.usersService.addManyUsersToRole(body.vai_tro_id, body.user_ids);
  }
}
