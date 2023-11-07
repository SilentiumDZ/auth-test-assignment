import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { USER_SERVICE } from './const/users.const';
import { AUTHORIZATION_SERVICE } from './const/authorization.const';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    ClientsModule.register([
      { name: AUTHORIZATION_SERVICE, transport: Transport.TCP, options: {port: 3003} },
      { name: USER_SERVICE, transport: Transport.TCP, options: {port: 3004} },
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
