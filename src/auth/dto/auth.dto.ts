import { UserEntity } from 'src/user/entity/user.entity';
import * as bcrypt from 'bcrypt';
import typia from 'typia';

export namespace AuthDto {
  export class Root {
    id: string;
    username: string;
    email?: string;
    password: string;

    async getEntity(dto: AuthDto.RegisterUserDto) {
      const user = new UserEntity();
      user.username = dto.username;
      user.email = dto.email;
      user.phone = dto.phone;
      user.password = await bcrypt.hash(dto.password, 10);

      return user;
    }
  }
  type RegisterBaseDto = {
    
    username: string;
    password: string;
  };

  type RegisterWithEmailDto = RegisterBaseDto & {
    email: string;
    phone?: never;
  };

  type RegisterWithPhoneDto = RegisterBaseDto & {
    phone: string;
    email?: never;
  };

  export type RegisterUserDto = RegisterWithEmailDto | RegisterWithPhoneDto;

  export type LoginWithEmailDto = {
    email: string & typia.tags.Format<'email'>;
    password: string;
    phone?: never;
    username?: never;
  };

  export type LoginWithUsernameDto = {
    username: string;
    password: string;
    email?: never;
    phone?: never;
  };

  export type LoginWithPhoneDto = {
    phone: string;
    password: string;
    username?: never;
    email?: never;
  };

  export type LoginUserDto =
    | LoginWithPhoneDto
    | LoginWithUsernameDto
    | LoginWithEmailDto;
}
