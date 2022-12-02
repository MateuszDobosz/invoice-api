import { Type } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { UpdateAddressDto } from 'src/addresses/dto/update-address.dto';

export class UpdateClientDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: UpdateAddressDto;
}
