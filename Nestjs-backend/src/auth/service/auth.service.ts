import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/users/service/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string; userId: string }> {
    const user = await this.userService.findByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const payload = {
        userId: user.id,
        username: user.username,
        email: user.email,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
        userId: user.id,
      };
    } else {
      throw new BadRequestException(['The Username or Password is Incorrect']);
    }
  }
}
