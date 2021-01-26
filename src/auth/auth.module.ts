import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
//import { UsersModule } from './users/users.module';
//import { AuthModule } from '../auth/auth.module'; //newly added
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}