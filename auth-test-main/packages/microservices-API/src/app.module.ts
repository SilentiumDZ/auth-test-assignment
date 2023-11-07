import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { USER_SERVICE } from './const/users.const';
import { AUTHORIZATION_SERVICE } from './const/authorization.const';
import { LOG_SERVICE } from './const/log.const';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    ClientsModule.register([
      { name: AUTHORIZATION_SERVICE, transport: Transport.TCP, options: {port: 3003} },
      { name: USER_SERVICE, transport: Transport.TCP, options: {port: 3004} },
      { name: LOG_SERVICE, transport: Transport.TCP, options: {port: 3005} },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
  ],
})
export class AppModule {

}
