
import { Module } from '@nestjs/common'
import { ProductStockController } from "./productStock.controller";
import { ProductStockService } from "./productStock.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './productStock.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Stock],'mongodb-connection')],
    controllers: [ProductStockController],
    providers: [ProductStockService]
})
export class ProductStockModule {
 
}