
import {Controller , Post ,Body, Get , Param, Patch , Delete,UseGuards, Request} from '@nestjs/common'
import {ProductService} from './products.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import jwt_decode from "jwt-decode";
import { ObjectID } from 'mongodb';

@Controller('products')
export class ProductController {
    constructor(private readonly ProductService: ProductService){}

    // @UseGuards(JwtAuthGuard)
    // @Post()
    // addProduct(@Body('title') prodTitle : string,
    //            @Body('description') prodDesc:string,
    //            @Body('price') prodPrice:number ) {
    //          const generetedId =  this.ProductService.insertProduct(prodTitle, prodDesc, prodPrice);
    //  return {id : generetedId}
    // }

    // @UseGuards(JwtAuthGuard)
    @Post()
    addProduct(@Request() req:any) {
        const generetedId =  this.ProductService.insertProduct(req);
        return {id : generetedId}

    }

    // @UseGuards(JwtAuthGuard)
    @Get()
    getAllProduct(){
        // const header = req.headers.authorization
        // const head_split = header.substr(7,header.length-7)
        // const decoded = jwt_decode(head_split);
        // req.body.createdBy = decoded.username
        // req.body.createdById = decoded.sub
        // req.body.createdAt = new Date()
        // console.log("req body",req.body);
        return this.ProductService.getProducts();
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    getProduct(@Param('id') prodId:string){
        return this.ProductService.getSingleProduct(prodId)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateProduct(@Param('id') prodId:string,@Request() req:any ){
        this.ProductService.updateProduct(prodId,req)
        return null
    }

    // @UseGuards(JwtAuthGuard)
    // @Patch(':id')
    // updateProduct(@Param('id') prodId:string, @Body('title') prodTitle : string,
    // @Body('description') prodDesc:string,
    // @Body('price') prodPrice:number ){
    //     this.ProductService.updateProduct(prodId,prodTitle,prodDesc,prodPrice)
    //     return null
    // }

    @Delete(':id')
    removeProduct(@Param('id') prodId: string){
        return this.ProductService.deleteProduct(prodId)
    }
}