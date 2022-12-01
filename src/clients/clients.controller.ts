import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEntity } from 'src/users/entities/user.entity';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createClientDto: CreateClientDto,
    @Request() req: { user: UserEntity },
  ) {
    return this.clientsService.create({ createClientDto, userId: req.user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  async getMy(@Request() req: { user: UserEntity }) {
    return this.clientsService.getByUserId(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async update(
    @Body() updateClientDto: UpdateClientDto,
    @Param('id') id: string,
  ) {
    return this.clientsService.update({ updateClientDto, clientId: id });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.clientsService.delete(id);
  }
}
