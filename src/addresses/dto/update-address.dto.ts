import { IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
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
