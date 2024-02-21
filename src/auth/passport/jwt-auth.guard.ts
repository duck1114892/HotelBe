import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorator/customsize';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }


  handleRequest(err, user, info, context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest()
    if (err || !user) {
      throw err || new UnauthorizedException("token không hợp lệ");
    }
    const targetMethod = request.method
    const targetEndpoint = request.route?.path
    const permission = user?.permission ?? []
    const isExist = permission.find(item => {
      return targetMethod === item.method && targetEndpoint === item.apiPath
    })
    if (!isExist) {
      throw new ForbiddenException("Bạn Không Có Quyền Truy Cập Endpoint Này");
    }
    return user;
  }
}
