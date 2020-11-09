
import {Controller , Post ,Body, Get , Param, Patch , Delete,UseGuards, Request, ParseIntPipe} from '@nestjs/common'
import {UsersService} from './users.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import jwt_decode from "jwt-decode";
import CreateUserDto from './data/create-user.dto';
import CreateGenreDto from './data/create-genre.dto';
import CreateBookDto from './data/create-book.dto';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UsersService){}

    
    // @Post()
    // addUser(@Request() req:any) {
    //     const generetedId =  this.usersService.insertUser(req);
    //     return {id : generetedId}

    // }

    // @Get()
    // getAllUser(){
    //     return this.usersService.getUser();
    // }

    //relation........................................................................abnf
    @Post('post')
    postUser( @Body() user: CreateUserDto) {
    return this.usersService.insert(user);
    }


  @Get('post')
  getAllUser() {
    return this.usersService.getAllUsers();
  }

  @Get('books')
  getBooksOfUs( @Body('userID', ParseIntPipe) userID: number ) {
    return this.usersService.getBooksOfUser(userID);
  }


//genre............................................................................

  @Post('genre')
  postGenre( @Body() genre: CreateGenreDto) {
    return this.usersService.insertGenre(genre);
  }
  @Get('genre')
  getAllGenre() {
    return this.usersService.getAllGenre();
  }


//books................................................................................abnf

@Post('book')
  postBook( @Body() book: CreateBookDto) {
    return this.usersService.insertBook(book);
  }

  @Get('book')
  getAllBook() {
    return this.usersService.getAllBook();
  }
    
}