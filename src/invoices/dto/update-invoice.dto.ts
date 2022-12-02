import { Type } from 'class-transformer';
import {
  IsDateString,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateAddressDto } from 'src/addresses/dto/update-address.dto';
import { UpdateClientDto } from 'src/clients/dto/update-client.dto';
import { ItemSchema } from './item-schema.dto';

export class UpdateInvoiceDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: UpdateAddressDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateClientDto)
  client: UpdateClientDto;

  @IsOptional()
  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  paymentTerms: string;

  @IsOptional()
  @IsString()
  projectDescription: string;

  @IsOptional()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  items: ItemSchema[];
}
