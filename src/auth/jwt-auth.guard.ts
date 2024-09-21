import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private authService: AuthService) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromRequest(request);
    
        if (this.authService.isTokenRevoked(token)) {
          throw new UnauthorizedException('Token has been revoked');
        }
    
        return super.canActivate(context);
      }
    
      private extractTokenFromRequest(request: any): string {
        const authHeader = request.headers['authorization'];
        if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
          return authHeader.split(' ')[1];
        }
        return null;
      }

}