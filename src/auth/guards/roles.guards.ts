import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
// import { UserService } from "src/user/service/user.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "src/user/models/user.interface";
import { UserService } from "src/user/user.service";
import { hasRoles } from "../decorator/roles.decorator";
// import { UserSecurityService } from "../services/user-security/user-security.service";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private userService :UserService
        // private userSecurityService: UserSecurityService
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user: User = request.user;

        return this.userService.findOne(user.id).pipe(
            map((user: User) => {
                const hasRole = () => roles.indexOf(user.role) > -1;
                let hasPermission: boolean = false;

                if (hasRole()) {
                    hasPermission = true;
                };
                return user && hasPermission;
            })
        )
    }
}
