import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,

    private readonly jwtService: JwtService,
  ) {}
  async registerUser(dto: AuthDto.RegisterUserDto): Promise<String> {
    const userExists = await this.userExists(dto);

    if (userExists) {
      if (userExists.username === dto.username) {
        throw new ConflictException(`Username ${dto.username} already exists`);
      } else if (userExists.email === dto.email) {
        throw new ConflictException(`Email ${dto.email} already exists`);
      } else if (userExists.phone === dto.phone) {
        throw new ConflictException(`Phone ${dto.phone} already exists`);
      }
    }

    // create user.
    const user = await new AuthDto.Root().getEntity(dto);

    await this.userRepo.save(user);

    // generate jwt.
    const payload = { sub: user.id, email: user.email, phone: user.phone };

    const jswtToken = this.jwtService.sign(payload);

    return jswtToken;
  }

  async userExists(
    dto: AuthDto.RegisterUserDto | AuthDto.LoginUserDto,
  ): Promise<UserEntity | null> {
    const userExists = await this.userRepo
      .createQueryBuilder('user')
      .where('user.username = :username', { username: dto.username })
      .orWhere('user.email = :email', { email: dto.email })
      .orWhere('user.phone = :phone', { phone: dto.phone })
      .getOne();

    return userExists;
  }

  async login(dto: AuthDto.LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.validateUser(dto);

    const payload = { sub: user.id, email: user.email, phone: user.phone };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateUser(dto: AuthDto.LoginUserDto): Promise<UserEntity> {
    const user = await this.userExists(dto);

    if (user && (await bcrypt.compare(dto.password, user.password))) {
      return user;
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
