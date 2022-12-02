import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateAddressDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  streetAddress: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  postCode: string;

  @IsOptional()
  @IsString()
  country: string;
}
