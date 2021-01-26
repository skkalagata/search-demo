import { Injectable, NotFoundException,HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose'

import { Product } from './product.model'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}
    public async login(user: {id:'sunilkalagata',name:'sunilkalagata',email:'skkalagata@gmail.com',password:'sunilk11'}): Promise<any | { status: number }> {
      const payload = { id: user.id, username: user.name };
        const accessToken = jwt.sign(payload, 'ThisIsASecretKey', {
          expiresIn: '1d',
        });
  
        return {
          statusCode: HttpStatus.OK,
          access_token: accessToken,
          expires_in: '1d',
          data: payload,
        };
      }
  
  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    })
    const result = await newProduct.save()
    return result.id as string
  }

  async getProducts() {
    const products = await this.productModel.find().exec()
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }))
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId)
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    }
  }

  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(productId)
    if (title) {
      updatedProduct.title = title
    }
    if (desc) {
      updatedProduct.description = desc
    }
    if (price) {
      updatedProduct.price = price
    }
    updatedProduct.save()
  }

  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec()
    if (result.n === 0) {
      throw new NotFoundException('Could not find product.')
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product
    try {
      product = await this.productModel.findById(id).exec()
    } catch (error) {
      throw new NotFoundException('Could not find product.')
    }
    if (!product) {
      throw new NotFoundException('Could not find product.')
    }
    return product
  }
}
