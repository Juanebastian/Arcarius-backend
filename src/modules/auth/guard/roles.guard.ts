import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

interface JwtPayload {
  sub: string;
  email: string;
  rol: string;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // usamos Reflector para leer metadata

  canActivate(context: ExecutionContext): boolean {
    const rolesPermitidos = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!rolesPermitidos || rolesPermitidos.length === 0) return true; // si no hay roles, dejamos pasar

    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: JwtPayload }>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    if (!rolesPermitidos.includes(user.rol)) {
      throw new ForbiddenException(
        `Acceso denegado: se requiere uno de estos roles: ${rolesPermitidos.join(', ')}`,
      );
    }

    return true;
  }
}
