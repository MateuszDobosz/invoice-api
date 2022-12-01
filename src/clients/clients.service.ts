import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async find(id: string) {
    return this.prisma.client.findFirst({
      where: {
        id,
      },
    });
  }

  async get(id: string) {
    const client = await this.find(id);
    if (!client) throw new NotFoundException('Client does not exists');
    return client;
  }

  async getByUserId(userId: string) {
    const query = {
      where: { userId },
      include: { address: true },
    };
    const [clients, count] = await this.prisma.$transaction([
      this.prisma.client.findMany(query),
      this.prisma.client.count({ where: query.where }),
    ]);

    return {
      data: clients,
      total: count,
    };
  }

  async create({
    createClientDto,
    userId,
  }: {
    createClientDto: CreateClientDto;
    userId: string;
  }) {
    const { name, email, address } = createClientDto;
    return this.prisma.client.create({
      data: {
        name,
        email,
        userId,
        address: {
          create: {
            ...address,
          },
        },
      },
      include: { address: true },
    });
  }
  async update({
    updateClientDto,
    clientId,
  }: {
    updateClientDto: UpdateClientDto;
    clientId: string;
  }) {
    const { name, email, address } = updateClientDto;
    await this.get(clientId);
    return this.prisma.client.update({
      where: { id: clientId },
      data: { name, email, address: { update: { ...address } } },
      include: { address: true },
    });
  }

  async delete(clientId: string) {
    await this.get(clientId);
    return this.prisma.client.delete({
      where: { id: clientId },
    });
  }
}
