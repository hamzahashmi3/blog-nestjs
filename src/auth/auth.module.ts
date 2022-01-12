import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

@Module({
  imports:[
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:async (configService:ConfigService) => ({
        secret : configService.get('JWT_SECRET'),
        signOptions :{ expiresIn: "100s"}
      })
    })
  ],
  providers: [AuthService]
})
export class AuthModule {}
