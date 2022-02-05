import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef, Module } from '@nestjs/common';
import { JwtStrategy } from './guards/jwt.strategy';
import { RolesGuard } from './guards/roles.guards';
import { JwtAuthGuard } from './guards/jwt.guards';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:async (configService:ConfigService) => ({
        secret : configService.get('JWT_SECRET'),
        signOptions :{ expiresIn: "10000s"}
      })
    })
  ],
  providers: [AuthService, JwtStrategy, RolesGuard, JwtAuthGuard],
  exports:[AuthService]
})
export class AuthModule {}

