import { Type } from 'class-transformer';
import {
  IsDateString,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';
import { ItemSchema } from './item-schema.dto';

export class CreateInvoiceDto {
  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateClientDto)
  client: CreateClientDto;

  @IsDateString()
  date: string;

  @IsString()
  paymentTerms: string;

  @IsString()
  projectDescription: string;

  @IsObject({ each: true })
  @ValidateNested()
  items: ItemSchema[];
}
