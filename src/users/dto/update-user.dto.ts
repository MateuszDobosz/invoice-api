import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 100)
  password: string;
}
