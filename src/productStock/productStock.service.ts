
import { from } from "rxjs";
import { Injectable, NotFoundException} from '@nestjs/common'
import { Stock} from './productStock.entity'
import { MongoRepository , createConnection,getConnection, Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import jwt_decode from "jwt-decode";




@Injectable()
export class ProductStockService{
    constructor(
        @InjectRepository(Stock,'mongodb-connection')
        private readonly stockRepository: Repository<Stock>,
      ) {}
 

    async insertStock(stock: any ){

        if(stock.body.method == 'update'){
            console.log(stock.body);
            
           const updateStock =await this.stockRepository.findOne(stock.body.id);
           updateStock.updatedAt=new Date()

            if(stock.body.productId){
                updateStock.productId=stock.body.productId
            }
            if(stock.body.orderId){
                updateStock.orderId = stock.body.orderId
            }
            if(stock.body.warehouseId){
                updateStock.warehouseId=stock.body.warehouseId
            }
            if(stock.body.quantity){
                updateStock.quantity=stock.body.quantity
            }
            
            console.log(updateStock);
            
            await this.stockRepository.save(updateStock)
        }

        if(stock.body.method == 'post'){
            stock.body.createdAt = new Date()
            console.log(stock.body);
            delete stock.body.method;
            await this.stockRepository.save(stock.body)
            return stock.id
        }

        if(stock.body.method == 'delete'){
            await this.stockRepository.delete(stock.body.id);
        }
        

    }


    async getStocks(){
        const result = await this.stockRepository.find();
        return result;
           
           
       }

       async deleteStock(prodid:string){
        await this.stockRepository.delete(prodid);
      
    }

    
    
}