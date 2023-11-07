import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './const/secret';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_SERVICE } from './const/users.const';
import { REDIS } from './providers/redis.provider';

@Module({
  imports: [
    ClientsModule.register([
      { name: USER_SERVICE, transport: Transport.TCP, options: {port: 3004} },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [
    AuthController,

  ],
  providers: [
    REDIS.PROVIDER,
    AuthService,
  ],
})
export class AuthModule {}
