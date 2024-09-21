import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AuthModule, UsersModule, ProfileModule,
    MongooseModule.forRoot('mongodb+srv://ruben:3142681446Rr@cluster0.brcma.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
