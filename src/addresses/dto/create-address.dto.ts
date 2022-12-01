import { IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  streetAddress: string;

  @IsString()
  city: string;

  @IsString()
  postCode: string;

  @IsString()
  country: string;
}
