import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class ItemSchema {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}
