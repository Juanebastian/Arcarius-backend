import { Request } from 'express';

export interface JwtPayload {
  sub: string; // id del usuario
  email: string;
  rol: string;
}

// Extiende Request para tipar user
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
