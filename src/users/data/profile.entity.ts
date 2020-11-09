import { ObjectID } from 'mongodb';
import { Entity, Column, ObjectIdColumn, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';


@Entity()
export class Profile{
  @ObjectIdColumn()
  id: string;
  @Column()
  gender: string;
  @Column()
  photo: string;

  @OneToOne(() => User, user => user.profile)
    user: User;
  
}

@Entity()
export class Mytest{
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  gender: string;
  @Column()
  photo: string;
  
}

