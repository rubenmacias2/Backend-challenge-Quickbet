// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({ isDeleted: false }).exec();
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user || user.isDeleted) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).lean();
    console.log('Usuario Encontrado:', user);
    return user;
  }
//   async findOneByEmail(email: string): Promise<User> {
//     return this.userModel.findOne({ email, isDeleted: false }).exec(); 
//   }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!updatedUser || updatedUser.isDeleted) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return updatedUser;
  }

  async softDelete(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).exec();
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);  // Hashear la contraseña
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,  // Guardar la contraseña hasheada
    });
    return createdUser.save();
  }
}
