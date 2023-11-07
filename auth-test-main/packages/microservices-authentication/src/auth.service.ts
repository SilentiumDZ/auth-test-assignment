import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {ClientProxy, RpcException} from '@nestjs/microservices';
import { USER_SERVICE } from './const/users.const';
import { InUserDataDTO } from './dto/in/in.user-data.dto';
import { REDIS } from './providers/redis.provider';

@Injectable()
export class AuthService {

  @Inject(USER_SERVICE)
  private readonly usersService: ClientProxy;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(REDIS.TOKEN)
  private readonly redis: REDIS.TYPE;

  async register(userData: InUserDataDTO) {
    const pattern = { cmd: 'find_user' };
    const user = await this.usersService.send(pattern, userData).toPromise();

    if (!user) {
      const pattern = { cmd: 'create_user' };
      await this.usersService.send(pattern, userData).toPromise();
    } else {
      throw new RpcException('User already exists');
    }

    const accessToken = this.jwtService.sign({ username: userData.username });

    this.redis.set('accessToken:' + userData.username, accessToken );
    return { accessToken };
  }
  async login(userData: InUserDataDTO) {
    const pattern = { cmd: 'find_user' };
    const user = await this.usersService.send(pattern, userData).toPromise();

    if (userData.password !== user.password) {
      throw new RpcException('Wrong password');
    }
    const accessToken = this.jwtService.sign({ username: userData.username });

    this.redis.set('accessToken:' + userData.username, accessToken );
    return { accessToken };
  }
}
