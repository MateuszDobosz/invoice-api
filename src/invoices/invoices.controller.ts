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
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @Request() req: { user: UserEntity },
  ) {
    return this.invoicesService.create({
      createInvoiceDto,
      userId: req.user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.invoicesService.get(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  async getMy(@Request() req: { user: UserEntity }) {
    return this.invoicesService.findByUserId(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.invoicesService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    return this.invoicesService.update({ updateInvoiceDto, invoiceId: id });
  }
}
