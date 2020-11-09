import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable, ObjectIdColumn } from 'typeorm'
import { GenreEntity } from './genre.entity';
import { UserEntity } from './user.entity';

@Entity()
export class BookEntity extends BaseEntity 
{
  @PrimaryGeneratedColumn()
  id: number;

  // @ObjectIdColumn()
  // id: string;

  @Column({ length: 500 })
  name: string;

  @ManyToOne(type => UserEntity, user => user.books)
  user: UserEntity;

  @ManyToMany(type => GenreEntity)
  @JoinTable()
  genres: GenreEntity[];
}