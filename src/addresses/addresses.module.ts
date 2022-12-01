import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [AddressesService],
  controllers: [AddressesController],
  imports: [PrismaModule],
})
export class AddressesModule {}
