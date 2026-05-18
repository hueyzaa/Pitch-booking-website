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
  ParseIntPipe,
} from '@nestjs/common';
import { ACTION } from 'src/configs/main.config';
import { permissions } from 'src/configs/permission.config';
import { CheckPermission } from '../decorators/check-permission.decorator';
import { UserReq } from '../decorators/user.decorator';
import { UserReqData } from '../users/interfaces/user-req.interface';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { RoleService } from './role.service';
import { FilterData } from '@database/interfaces/filter-data.interface';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @CheckPermission(ACTION.create)
  @Post('/default-permission')
  async defaultPermission() {
    return permissions;
  }

  @CheckPermission(ACTION.create)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto, @UserReq() user: UserReqData) {
    createRoleDto.nguoi_tao = user.id;
    return this.roleService.create(createRoleDto);
  }

  @HttpCode(200)
  @Get('options')
  findAllForSelectOptions(@Query() filters: FilterData) {
    return this.roleService.findForSelectOptions(filters);
  }

  @CheckPermission(ACTION.index)
  @Get()
  findAll(@Query() filters: FilterData) {
    return this.roleService.findAll(filters);
  }

  @CheckPermission(ACTION.show)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findOne(id);
  }

  @CheckPermission(ACTION.edit)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
    @UserReq() user: UserReqData,
  ) {
    updateRoleDto.nguoi_cap_nhat = user.id; // Corrected: user.id for update tracking usually handled by service/DTO or just passed
    // NOTE: Entities often have auto-update/create logic for timestamps, but service handles logic.
    return this.roleService.update(id, updateRoleDto);
  }

  @CheckPermission(ACTION.delete)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.remove(id);
  }
}
