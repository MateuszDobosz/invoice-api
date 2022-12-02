import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async create({
    createInvoiceDto,
    userId,
  }: {
    createInvoiceDto: CreateInvoiceDto;
    userId: string;
  }) {
    const { address, client, items, date, paymentTerms, projectDescription } =
      createInvoiceDto;
    const { name, email, address: clientAddress } = client;

    return this.prisma.invoice.create({
      data: {
        paymentTerms,
        projectDescription,
        date: new Date(date),
        user: { connect: { id: userId } },
        address: {
          connectOrCreate: {
            where: { id: address.id || 'fakeId' },
            create: { ...address },
          },
        },
        client: {
          connectOrCreate: {
            where: { id: client?.id || 'fakeId' },
            create: {
              name,
              email,
              address: {
                create: {
                  ...clientAddress,
                },
              },
              user: { connect: { id: userId } },
            },
          },
        },
        items: { createMany: { data: items } },
      },
      include: {
        address: true,
        client: { include: { address: true } },
        items: true,
      },
    });
  }

  async update({
    updateInvoiceDto,
    invoiceId,
  }: {
    updateInvoiceDto: UpdateInvoiceDto;
    invoiceId: string;
  }) {
    const { address, client, items, date, ...rest } = updateInvoiceDto;
    const { address: clientAddress, ...restClient } = client;
    await this.get(invoiceId);

    return this.prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        ...rest,
        date: new Date(date),
        address: { update: { ...address } },
        client: {
          update: { ...restClient, address: { update: { ...clientAddress } } },
        },
        items: {
          upsert: items.map((item) => {
            return {
              where: {
                id: item.id || 'fakeID',
              },
              update: {
                name: item.name,
                quantity: item.quantity,
                price: item.price,
              },
              create: {
                name: item.name,
                quantity: item.quantity,
                price: item.price,
              },
            };
          }),
        },
      },
      include: {
        address: true,
        client: { include: { address: true } },
        items: true,
      },
    });
  }
  async find(id: string) {
    return this.prisma.invoice.findUnique({
      where: { id },
      include: {
        address: true,
        client: { include: { address: true } },
        items: true,
      },
    });
  }

  async get(id: string) {
    const invoice = await this.find(id);
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  async delete(id: string) {
    await this.get(id);
    return this.prisma.invoice.delete({ where: { id } });
  }

  async findByUserId(userId: string) {
    const query = {
      where: { ownerId: userId },
      include: {
        address: true,
        items: true,
        client: { include: { address: true } },
      },
    };
    const [clients, count] = await this.prisma.$transaction([
      this.prisma.invoice.findMany(query),
      this.prisma.invoice.count({ where: query.where }),
    ]);

    return {
      data: clients,
      total: count,
    };
  }
}
