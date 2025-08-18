import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAllUsers() {
        return this.userService.findAll();
    }

    @Post('data')
    async createUser(@Body() userData: any) {
        return this.userService.create(userData);
    }
}
