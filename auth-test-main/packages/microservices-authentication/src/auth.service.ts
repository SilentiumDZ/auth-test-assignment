import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {ClientProxy, RpcException} from '@nestjs/microservices';
import { USER_SERVICE } from './const/users.const';
import { InUserDataDTO } from './dto/in/in.user-data.dto';

@Injectable()
export class AuthService {

  @Inject(USER_SERVICE)
  private readonly usersService: ClientProxy;

  @Inject(JwtService)
  private jwtService: JwtService;

  async register(userData: InUserDataDTO) {
    const pattern = { cmd: 'find_user' };
    const user = await this.usersService.send(pattern, userData).toPromise();

    console.log(user);
    if (!user) {
      const pattern = { cmd: 'create_user' };
      await this.usersService.send(pattern, userData).toPromise();
    } else {
      throw new RpcException('User already exists');
    }

    return {
      access_token: this.jwtService.sign( userData.username ),
    };
  }
  async login(userData: InUserDataDTO) {
    const pattern = { cmd: 'find_user' };
    const user = await this.usersService.send(pattern, userData).toPromise();

    if (userData.password !== user.password) {
      throw new RpcException('Wrong password');
    }

    return {
      access_token: this.jwtService.sign( userData.username ),
    };
  }
}
