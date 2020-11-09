import {Controller , Post ,Body, Get , Param, Patch , Delete,UseGuards, Request} from '@nestjs/common'
import {ProductStockService} from './productStock.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import jwt_decode from "jwt-decode";



@Controller('stock')
export class ProductStockController {
    constructor(private readonly productStockService: ProductStockService){}


    // @UseGuards(JwtAuthGuard)
    @Post()
    addStock(@Request() req:any) {
        const generetedId =  this.productStockService.insertStock(req);
        return {id : generetedId}

    }

    // @UseGuards(JwtAuthGuard)
    @Get()
    getAllStock(){
        return this.productStockService.getStocks();
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId: string){
        return this.productStockService.deleteStock(prodId)
    }

    
}