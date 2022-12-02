import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAddressDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  streetAddress: string;

  @IsString()
  city: string;

  @IsString()
  postCode: string;

  @IsString()
  country: string;
}
