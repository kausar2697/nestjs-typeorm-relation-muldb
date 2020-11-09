
import { ObjectID } from 'mongodb';
import { Entity, Column, ObjectIdColumn, OneToOne, JoinColumn, BaseEntity, PrimaryGeneratedColumn, OneToMany ,} from 'typeorm';
import { BookEntity } from './book.entity';
import { Profile } from './profile.entity';


@Entity()
export class User{
  [x: string]: any;
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  username: string;
  @Column()
  password: string;

  @OneToOne(() => Profile , profile => profile.user)
  @JoinColumn()
  profile: Profile
}


@Entity()
export class Auth{
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  username: string;
  @Column()
  userId: ObjectID;
  @Column()
  logTime: string;
}


@Entity()
export class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;
  
  // @Column({ length: 500 })
  // test: string;

  @OneToMany( type => BookEntity , book => book.user)
  books: BookEntity[];
}


