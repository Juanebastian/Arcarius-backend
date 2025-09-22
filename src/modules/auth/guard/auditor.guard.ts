import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class AuditorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user?.rol !== 'auditor') {
      throw new ForbiddenException('Acceso denegado: se requiere rol de auditor');
    }

    return true;
  }
}
