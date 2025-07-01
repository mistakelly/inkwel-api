// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-local';
// import { AuthService } from '../auth.service';
// import { UnauthorizedException } from '@nestjs/common';
// import { AuthDto } from '../dto/auth.dto';
// import { UserEntity } from 'src/user/entity/user.entity';

// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: AuthService) {
//     super();
//   }

//   async validate(
//     dto: AuthDto.RegisterUserDto | AuthDto.LoginUserDto,
//   ): Promise<UserEntity> {
//     const user = await this.authService.validateUser(dto);

//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
// }
