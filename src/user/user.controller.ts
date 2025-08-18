import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {

@Get()
    getAllUsers() {
        return "The server is running user";
    }

    @Post("data")
        createUser(@Body() userData: any) {
    }
}
