import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './passport/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import ms from 'ms';
import { AuthController } from './auth.controller';
import { User } from './decorator/customsize';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_JWT_SECRET'),
        signOptions: {
          expiresIn: ms(configService.get<string>('ACCESS_JWT_EXPIRE')) / 1000,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
