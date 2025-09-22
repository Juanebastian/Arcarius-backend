// usuarios/dto/usuario-response.dto.ts
export class UsuarioResponseDto {
  id: number;
  documento: string;
  nombre_completo: string;
  email: string;
  password_hash: string;
  rol_id: string; // 👈 ya no es objeto
  telefono: string;
  activo: boolean;
  fecha_registro: Date;
}
