import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(private prisma: PrismaService) {}
  async create({
    createAddressDto,
    userId,
  }: {
    createAddressDto: CreateAddressDto;
    userId: string;
  }) {
    const address = await this.findAddressByUserId(userId);
    if (address) throw new BadRequestException('User has address already');

    return this.prisma.address.create({
      data: { ...createAddressDto, userId },
    });
  }
  async getAddressByUserId(userId: string) {
    const address = await this.findAddressByUserId(userId);
    if (!address) throw new NotFoundException('Address not found');
    return address;
  }
  async findAddressByUserId(userId: string) {
    return this.prisma.address.findFirst({
      where: { userId },
    });
  }

  async updateAddressByUserId({
    updateAddressDto,
    userId,
  }: {
    updateAddressDto: UpdateAddressDto;
    userId: string;
  }) {
    const address = await this.getAddressByUserId(userId);
    return this.prisma.address.update({
      where: { id: address.id },
      data: { ...updateAddressDto },
    });
  }
}
