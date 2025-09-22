import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

interface JwtPayload {
  sub: string;
  email: string;
  rol: string; // 👈 este campo viene del login
}

@Injectable()
export class FuncionarioGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: JwtPayload }>();

    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    if (user.rol !== 'funcionario') {
      throw new ForbiddenException(
        'Acceso denegado: se requiere rol de funcionario',
      );
    }

    return true;
  }
}
