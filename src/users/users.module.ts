import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User,Auth, UserEntity } from './data/user.entity';
import { UserController } from './user.controller';
import { Profile,Mytest } from './data/profile.entity';
import { GenreEntity } from './data/genre.entity';
import { BookEntity } from './data/book.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User,Auth,Profile],'mongodb-connection'),TypeOrmModule.forFeature([Mytest,UserEntity,GenreEntity,BookEntity],'mysql-connection')],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService,TypeOrmModule.forFeature([Auth],'mongodb-connection')],
})
export class UsersModule {}