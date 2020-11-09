import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable, ObjectIdColumn } from 'typeorm'

@Entity()
export  class GenreEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  // @ObjectIdColumn()
  // id: string;

  @Column()
  type: string;

}