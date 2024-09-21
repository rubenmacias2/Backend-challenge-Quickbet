import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'user@example.com', description: 'Email del usuario' })
    @IsEmail({}, { message: 'El email debe ser válido' })
    email: string;
  
    @ApiProperty({ example: 'password123', description: 'Contraseña del usuario' })
    @IsNotEmpty({ message: 'La contraseña no debe estar vacía' })
    password: string;
  }