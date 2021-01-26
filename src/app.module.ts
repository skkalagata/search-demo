import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
//import { AuthModule } from './auth/auth.module';

@Module({
imports: [ProductsModule, 
  MongooseModule.forRoot(
    'mongodb+srv://myuser:C3L1a32mk72TIODZ@cluster0.7da4f.mongodb.net/demoData?retryWrites=true&w=majority'
    ),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
