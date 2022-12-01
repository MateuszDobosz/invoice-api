import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async register(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { password, email } = createUserDto;

    const user = await this.usersService.findOneByEmail(email);
    if (user) throw new HttpException('User already exists', 409);
    const hashedPassword = await this.hash(password);

    return this.usersService.create({ email, password: hashedPassword });
  }

  async hash(password: string) {
    const salt = this.configService.get<number>('bcryptSalt');
    return bcrypt.hash(password, salt);
  }

  async validateUserCredentials(loginDto: LoginDto): Promise<UserEntity> {
    const { email, password: pass } = loginDto;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    if (!(await bcrypt.compare(pass, user.password)))
      throw new BadRequestException('Invalid credentials');

    return user;
  }

  async login(user: UserEntity) {
    const { email, id } = user;
    const payload = { email, sub: id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
