import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Stock{
      @ObjectIdColumn()
      id: string;
      @Column()
      productId: string;
      @Column()
      orderId: string;
      @Column()
      warehouseId: string;
      @Column()
      shelfId: string;
      @Column()
      quantity: number;
      @Column()
      note:string;
      @Column()
      updatedBy: string;
      @Column()
      updatedAt: Date;
      @Column()
      createdBy: string;
      @Column()
      createdAt: Date;
      // @Column()
      // members: [];
}
