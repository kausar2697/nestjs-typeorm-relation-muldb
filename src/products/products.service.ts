import { from } from "rxjs";
import { Injectable, NotFoundException} from '@nestjs/common'
import { Product} from './product.entity'
import { ProductController } from "./product.controller";
import { MongoRepository , createConnection,getConnection, Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import jwt_decode from "jwt-decode";



@Injectable()
export class ProductService{
    constructor(
        @InjectRepository(Product,'mongodb-connection')
        private readonly userRepository: Repository<Product>,
        
      ) {}
    // private products: Product[] = []

    // async insertProduct(title: string , desc: string , price: number){
    //     const newProduct = new Product
    //     newProduct.title = title
    //     newProduct.desc = desc
    //     newProduct.price = price


    //     await this.userRepository.save(newProduct)
    // }


    async insertProduct(prod: any ){
        const header = prod.headers.authorization
        const head_split = header.substr(7,header.length-7)
        const decoded = jwt_decode(head_split);
        prod.body.createdBy = decoded.sub
        prod.body.createdAt = new Date()
        console.log(prod.body);
        await this.userRepository.save(prod.body)
        

    }

   

    

     async getProducts(){
     return await this.userRepository.find();
        
        
    }
    

    async getSingleProduct(productId: string){
        console.log((productId));
        
        const product = await this.userRepository.findOne(productId);
        console.log(product);
        
        return product
        // const product = this.searchProduct(productId)[0]
        // return {...product}
    }

    async updateProduct(productId:string, updProd){
        const updateProduct =await this.userRepository.findOne(productId);
      
        const header = updProd.headers.authorization
        const head_split = header.substr(7,header.length-7)
        const decoded = jwt_decode(head_split);

        console.log("updateProduct",updateProduct);
        console.log("update body", updProd.body);
        
        
        updateProduct.updatedBy=decoded.sub
        updateProduct.updatedAt=new Date()
        if(updProd.body.title){
            updateProduct.title=updProd.body.title
        }
        if(updProd.body.desc){
            updateProduct.desc = updProd.body.desc
        }
        if(updProd.body.price){
            updateProduct.price=updProd.body.price
        }
        
        console.log(updateProduct);
        
        await this.userRepository.save(updateProduct)
        
        
    }

    // updateProduct(productId:string, title:string, desc:string, price:number){
    //     const [product , index] = this.searchProduct(productId)
    //     const updatedProduct = {...product}
    //     if(title){
    //         updatedProduct.title=title
    //     }

    //     if(desc){
    //         updatedProduct.desc=desc
    //     }
    //     if(price){
    //         updatedProduct.price=price
    //     }
    //     this.products[index] = updatedProduct
    // }

    async deleteProduct(prodid:string){
        await this.userRepository.delete(prodid);
      
    }

    
    
}