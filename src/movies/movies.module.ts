import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    controllers: [MoviesController],
    providers: [MoviesService, UserService]
})
export class MoviesModule {}
