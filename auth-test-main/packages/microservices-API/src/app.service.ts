import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE } from './const/users.const';
import { AUTHORIZATION_SERVICE } from './const/authorization.const';
import {InUserDataDTO} from './dto/in/in.user-data.dto';

@Injectable()
export class AppService {
  @Inject(USER_SERVICE)
  private readonly usersService: ClientProxy;

  @Inject(AUTHORIZATION_SERVICE)
  private readonly authorizationService: ClientProxy;

  async login(userData: InUserDataDTO) {
    const pattern = { cmd: 'login' };
    const payload = { username: userData.username, password: userData.password };
    return this.authorizationService.send(pattern, payload);
  }

  async register(userData: InUserDataDTO) {
    const pattern = { cmd: 'register' };
    const payload = { username: userData.username, password: userData.password };
    return this.authorizationService.send(pattern, payload);
  }

  async getUserInfo(userData: InUserDataDTO) {
    const pattern = { cmd: 'find_user' };
    const payload = { username: userData.username, password: userData.password };
    return this.usersService.send(pattern, payload);
  }
}
