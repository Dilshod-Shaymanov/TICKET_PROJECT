import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorator/roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
      throw new UnauthorizedException({
        message: "Headerda Token berilmagan",
      });
    }

    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];
    console.log(token);
    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedException({
        message: "Bearer va Token berilmagan",
      });
    }
    let payload: any;
    try {
      payload = this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException({
        message: "Token verificatsiyadan o'tmadi",
        error,
      });
    }
    req.user = payload;

    const permission = payload.roles.some((role: any) =>
      requiredRoles.includes(role.value)
    );
    if (!permission) {
      throw new ForbiddenException({
        message: "Ruxsat etilmagan role ",
      });
    }
    return true;
  }
}
