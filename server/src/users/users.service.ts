import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './users.model'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User
    ) {}

    async create(createUserDto: CreateUserDto) {
        const user = await this.userModel.create(createUserDto)
        console.log(user)
        return user
    }

    async findOne(id: number) {
        const user = await this.userModel.findByPk(id)
        return user
    }

    async findOneByEmail(email: string) {
        const user = await this.userModel.findOne({
            where: { email }
        })
        return user
    }
}
