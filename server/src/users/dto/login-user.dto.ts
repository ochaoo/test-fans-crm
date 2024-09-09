import { IsEmail, IsString, Length } from 'class-validator'

export class LoginUserDto {
    @IsString()
    @IsEmail({}, { message: 'Incorrect email' })
    readonly email: string

    @IsString()
    @Length(4, 16, { message: 'Not less than 4 and not more than 16' })
    readonly password: string
}
