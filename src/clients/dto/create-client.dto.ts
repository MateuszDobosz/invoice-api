import { Type } from 'class-transformer';
import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';

export class CreateClientDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
