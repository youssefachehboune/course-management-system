import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './user.schema';
import { CoursesService } from 'src/courses/courses.service';
import { Course } from 'src/courses/course.schema';
@Injectable()
export class UsersService {
    /**
   * Creates an instance of the UsersService class.
   * @param {Model<UserDocument>} UserModel - The Mongoose model for the User collection.
   */
  constructor(
      @InjectModel(User.name) private UserModel: Model<UserDocument>,
      private coursesService: CoursesService,
      
  ) {}

  /**
   * Find a user by their username
   * @param username Username to find
   * @returns User object or undefined
   */
  async findByUsername(username: string): Promise<User | null> {
    return this.UserModel.findOne({ username }).exec();
}

  /**
   * Create a new user
   * @param username New user's username
   * @param fullName New user's full name
   * @param password New user's hashed password
   * @returns Created user
   */
  async createUser(username: string, fullName: string, password: string) {
    const newUser = new this.UserModel({username, fullName, hashedPassword: password});
    return newUser.save();
  }

  /**
   * Get all my courses
   * @param username Username of the user
   * @returns List of courses
   * @throws Error if user is not found
   */
  async getMyCourses(username: string) {
    const user = await this.findByUsername(username);
    if (!user) {
        throw new Error('User not found');
    }
   let courses : {
    instructor: string;
    id: string;
    title: string;
   }[]= [];
    for (let i = 0; i < user.courses.length; i++) {
        const course = await this.coursesService.findById(user.courses[i]);
        if(!course) continue;
        courses.push(course);
    }
    return courses;
    
}
}
