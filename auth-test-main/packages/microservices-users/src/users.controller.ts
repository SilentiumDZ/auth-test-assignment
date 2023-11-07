import {Controller, Inject} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InUsersDto } from './dto/in/in.users.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {

  @Inject(UsersService)
  private readonly usersService: UsersService;

  @MessagePattern({ cmd: 'find_user' })
  async findUser(userInfo: InUsersDto) {
    return this.usersService.findUser(userInfo);
  }

  @MessagePattern({ cmd: 'create_user' })
  async createUser(userInfo: InUsersDto) {
    return this.usersService.createUser(userInfo);
  }
}
