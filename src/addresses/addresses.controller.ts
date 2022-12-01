import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEntity } from 'src/users/entities/user.entity';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createAddressDto: CreateAddressDto,
    @Request() req: { user: UserEntity },
  ) {
    return this.addressesService.create({
      createAddressDto,
      userId: req.user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  async getMy(@Request() req: { user: UserEntity }) {
    return this.addressesService.getAddressByUserId(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/my')
  async update(@Body() updateAddressDto, @Request() req: { user: UserEntity }) {
    return this.addressesService.updateAddressByUserId({
      updateAddressDto,
      userId: req.user.id,
    });
  }
}
