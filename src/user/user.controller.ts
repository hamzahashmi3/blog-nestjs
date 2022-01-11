import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from './models/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService : UserService) { }

    @Post()
    create(@Body()user: User ):Observable<User>{
        return this.userService.create(user)
    }

    @Get(':id')
    findOne(@Param() Param ):Observable<User>{
        return this.userService.findOne(Param.id)
    }

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
    

}
