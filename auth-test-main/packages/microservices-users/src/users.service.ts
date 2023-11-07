import {Injectable } from '@nestjs/common';
import User from './entities/User';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(user) {
        const userEntity = this.userRepository.create({ username: user.username, password: user.password });

        return await this.userRepository.save(userEntity);
        }

    async findUser(user) {

        return await this.userRepository.findOne({ where: { username: user.username } });
    }
}
