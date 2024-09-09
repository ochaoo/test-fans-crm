import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { LoginUserDto } from '../users/dto/login-user.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() userDto: LoginUserDto) {
        return this.authService.login(userDto)
    }

    @Post('registration')
    @UsePipes(new ValidationPipe())
    registration(@Body() createUserDto: CreateUserDto) {
        return this.authService.registration(createUserDto)
    }
}
