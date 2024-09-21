import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from "./dto/login.dto";
import * as bcrypt from 'bcryptjs';
import { User } from "src/users/schemas/user.schema";

@Injectable()
export class AuthService {

  private revokedTokens: string[] = [];

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // async validateUser(email: string, pass: string): Promise<any> {
  //   debugger;
  //   const user = await this.usersService.findOneByEmail(email);

  //   if (user && !user.isDeleted) {
  //     const isPasswordValid = await bcrypt.compare(pass, user.password);
  //     console.log('Password valid:', isPasswordValid);

  //     if (!isPasswordValid) {
  //       const { password, ...result } = user;
  //       return result;
  //     }
  //   }

  //   return null;
  // }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if(user && !user.isDeleted) {
        console.log(user);
        const { password, ...result } = user;
        return result;
    }
    return null;
  }

  async login(loginDto: LoginDTO) {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);
    if (!user) {
      console.log(user);
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { email: user.email, sub: user._id };
    console.log('Inicio de sesión exitoso');
    return {
      access_token: this.jwtService.sign(payload),      
    };
  }

  //Cerrar la sesión
  async logout(token: string): Promise<void> {
    this.revokedTokens.push(token);
  }

  isTokenRevoked(token: string): boolean {
    return this.revokedTokens.includes(token);
  }


}