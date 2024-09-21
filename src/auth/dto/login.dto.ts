import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ example: 'user@example.com', description: 'Email de usuario' })
  @IsEmail({}, { message: 'El email debe ser valido'})
  email: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña del usuario'})
  @IsNotEmpty({ message: 'La contraseña no debe estar vacía'})
  password: string;
}
