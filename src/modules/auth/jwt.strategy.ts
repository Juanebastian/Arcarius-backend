import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'mi_secreto', // ⚠️ en producción usar process.env.JWT_SECRET
    });
  }

  // lo que devuelve aquí se inyecta en req.user
  validate(payload: { sub: string; email: string; rol: string[] }) {
    return {
      userId: payload.sub,
      email: payload.email,
      rol: payload.rol,
    };
  }
}
