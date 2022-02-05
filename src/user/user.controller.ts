import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { User, userRoles } from './models/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService : UserService) { }

    @Post()
    create(@Body()user: User ):Observable<User | Object>{
        return this.userService.create(user).pipe(
            map((user:User)=>user),
            catchError(err=> of({Error : err.message}))
        )
    }

    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { access_token: jwt };
            })
        )
    }

    @Get(':id')
    findOne(@Param() Param ):Observable<User>{
        return this.userService.findOne(Param.id)
    }

    @hasRoles(userRoles.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get()
    findAll():Observable<User[]>{
        return this.userService.findAll()
    }

    @Delete(':id')
    deleteOne(@Param('id') id:string):Observable<any>{
        return this.userService.deleteOne(Number(id))
    }

    @Put(':id')
    UpdateOne(@Param('id') id:string, @Body() user:User):Observable<any>{
        return this.userService.updateOne(Number(id), user)    
    }
    
    @Put(':id/role')
    UpdateRoleOfUser(@Param('id') id:string, @Body() user:User):Observable<any>{
        return this.userService.updateRoleOfUser(Number(id), user)
    }

}
