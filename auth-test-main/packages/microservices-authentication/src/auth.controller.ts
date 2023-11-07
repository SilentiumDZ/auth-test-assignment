import { Controller, Inject} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { InUserDataDTO } from './dto/in/in.user-data.dto';

@Controller()
export class AuthController {

  @Inject(AuthService)
  private readonly authService: AuthService;

  @MessagePattern({ cmd: 'register' })
  register(userData: InUserDataDTO) {
    return this.authService.register(userData);
  }
  @MessagePattern({ cmd: 'login' })
  login(userData: InUserDataDTO) {
    return this.authService.login(userData);
  }
}
