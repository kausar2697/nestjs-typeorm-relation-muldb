import { ObjectID } from 'mongodb';
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Product{
  // constructor(public id: string ,public title: string ,public desc: string ,public price: number){};
  @ObjectIdColumn()
  id: string;
  @Column()
  title: string;
  @Column()
  desc: string;
  @Column()
  price: number;
  @Column()
  updatedBy: string;
  @Column()
  updatedAt: Date;
  @Column()
  createdBy: string;
  @Column()
  createdAt: Date;
}
