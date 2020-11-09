import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/product.module';
import { ProductStockModule } from './productStock/productStock.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Profile,Mytest } from './users/data/profile.entity';
import { Product } from './products/product.entity';
import { User,UserEntity } from './users/data/user.entity';
import { Stock } from './productStock/productStock.entity';
import { Auth } from './users/data/user.entity';
import { BookEntity } from './users/data/book.entity';
import { GenreEntity } from './users/data/genre.entity';

@Module({
  imports: [ProductsModule,TypeOrmModule.forRoot({
    name:'mongodb-connection',
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'test-db',
    entities: [Profile,Product,User,Stock,Auth],
    synchronize: false,
    useNewUrlParser: true,
    logging: true,
  }),
  
  TypeOrmModule.forRoot({
    name:'mysql-connection',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'test-db',
    entities: [Mytest,UserEntity,BookEntity,GenreEntity],
    synchronize: true,
    logging: true,
  }),
  
  // TypeOrmModule.forRoot({
  //   name:'mysql-connection',
  //   type: 'postgres',
  //   host: 'localhost',
  //   port: 5432,
  //   username: 'postgres',
  //   password: '12345', 
  //   database: 'test-db-2',
  //   entities: [Mytest,UserEntity,BookEntity,GenreEntity],
  //   synchronize: true,
  //   logging: true,
  // }),
  
  AuthModule, UsersModule,ProductStockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
