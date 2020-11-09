import { Injectable } from '@nestjs/common';
import { MongoRepository , createConnection,getConnection, Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {  User, UserEntity } from './data/user.entity';
import { Profile } from './data/profile.entity';
import { Mytest } from './data/profile.entity';
import CreateUserDto from './data/create-user.dto';
import { BookEntity } from './data/book.entity';
import { GenreEntity } from './data/genre.entity';
import CreateGenreDto from './data/create-genre.dto';
import CreateBookDto from './data/create-book.dto';

@Injectable()
export class UsersService {
  // private readonly users: User[];

  constructor(
    @InjectRepository(User,'mongodb-connection') private readonly userRepository: MongoRepository<User>,
    @InjectRepository(Profile,'mongodb-connection') private readonly profileRepository: MongoRepository<Profile>,
    @InjectRepository(Mytest,'mysql-connection') private readonly testRepository: Repository<Mytest>,
    @InjectRepository(UserEntity,'mysql-connection') private readonly userEntityRepository: Repository<UserEntity>,
    @InjectRepository(GenreEntity,'mysql-connection') private readonly genreEntityRepository: Repository<GenreEntity>,
    @InjectRepository(BookEntity,'mysql-connection') private readonly bookEntityRepository: Repository<BookEntity>,

  ) {
    // this.users = [
    //   { 
    //     userId: 1,
    //     username: 'john',
    //     password: 'changeme',
    //   },
    //   {
    //     userId: 2,
    //     username: 'chris',
    //     password: 'secret',
    //   },
    //   {
    //     userId: 3,
    //     username: 'maria',
    //     password: 'guess',
    //   },
    // ];


  }

//   async insertUser(user: any ){
//     const profileData = new Mytest()
//     profileData.gender = user.body.gender
//     profileData.photo = user.body.photo
//     const newProfile= await this.testRepository.save(profileData)

//     const userData = new User()
//     userData.username = user.body.username
//     userData.password = user.body.password
//     // userData.profile = newProfile
//     await this.userRepository.save(userData)
    
// }

//  async getUser(){
//  const user= await this.userRepository.find({
//     relations: ['profile'] ,
//     // join: {
//     //   alias: "myprofile",
//     //   leftJoinAndSelect: {
//     //       profile: "myprofile.gender",
//     //       photo: "myprofile.photos"
//     //   }
//   // }
//   });
//  console.log('user data: ',user);
//  return user;
 
    
    
// }

  async findOne(username: string){
    const result = await this.userRepository.find({username: username});
    // console.log(result);
    return result;
    
  }

  //relation.........................................................................abnf

  async insert(userDetails: CreateUserDto){
    const userEntity = new UserEntity()
    const {name } = userDetails;
    userEntity.name = name;
    await this.userEntityRepository.save(userEntity);
    return userEntity;
  }

  async getAllUsers(){
    return await this.userEntityRepository.find();
  }

  async getBooksOfUser(userID: number){
    console.log("id...............................",typeof(userID));
    const user: UserEntity = await this.userEntityRepository.findOne({where: {id: userID}, relations: ['books']});
    return user.books;
  }


  //genre....................................................................................abnf
  async insertGenre(genreDetails: CreateGenreDto){
    const {type} = genreDetails;
    const genreEntity = new GenreEntity()
    genreEntity.type = type;
    await this.genreEntityRepository.save(genreEntity);
    return genreEntity;
  }
  async getAllGenre(){
        return await this.genreEntityRepository.find();
  }


  //books.................................................................................................abnf
  async insertBook(bookDetails: CreateBookDto){
    console.log("bookss..........",bookDetails);
    
    const { name , userID , genreIDs } = bookDetails;
    const book = new BookEntity();
    book.name = name;
    book.user = await this.userEntityRepository.findOne(userID) ;
    book.genres=[];
    for ( let i = 0; i < genreIDs.length ; i++)
    {
             const genre = await this.genreEntityRepository.findOne(genreIDs[i]);
             book.genres.push(genre);
    }
    await this.bookEntityRepository.save(book);
    return book;
  }

  async getAllBook(){
    // const user: UserEntity = await UserEntity.findOne({where: {id: 2}, relations: ['books']});
    return this.bookEntityRepository.find();
  }
}