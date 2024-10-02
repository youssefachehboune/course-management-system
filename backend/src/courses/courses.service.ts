import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Course, CourseDocument } from './course.schema';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  /**
   * Creates an instance of the CoursesService class.
   * @param {Model<CourseDocument>} CourseModel - The Mongoose model for the Course collection.
   */
  constructor(
    @InjectModel(Course.name) private CourseModel: Model<CourseDocument>,
  ) {}

  /**
   * Creates a new course in the database.
   *
   * @param {CreateCourseDto} courseData - The DTO containing the data for the new course.
   * @returns {Promise<Course>} The newly created course.
   *
   * @example
   * const course = await coursesService.create({
   *   title: "Compatible user-facing hierarchy",
   *   description: "Modern consider if. Girl current truth work available chair write.",
   *   instructor: "Michael Gill",
   *   schedule: "Thursday 13:00"
   * });
   */
  async create(courseData: CreateCourseDto, userName?: string) {
    const createdCourse = new this.CourseModel(courseData);
    const newCourse = await createdCourse.save();
    return newCourse;
  }

  /**
   * Retrieves all courses with pagination.
   *
   * @param {number} [page=1] - The page number for pagination.
   * @param {number} [limit=10] - The number of courses to return per page.
   * @returns {Promise<Course[]>} A list of courses.
   *
   * @example
   * const courses = await coursesService.findAll(1, 10);
   */
  async findAll(page: number = 1, limit: number = 10): Promise<Course[]> {
    const skip = (page - 1) * limit;
    return this.CourseModel.find().skip(skip).limit(limit).exec();
  }

  /**
   * Searches for courses by title, with pagination.
   *
   * @param {string} search - The search term to filter courses by title.
   * @param {number} [page=1] - The page number for pagination.
   * @param {number} [limit=10] - The number of courses to return per page.
   * @param {number} [sortnumber=1] - The sort order for the search results (1 for ascending, -1 for descending).
   * @returns {Promise<Course[]>} A list of courses that match the search criteria.
   *
   * @example
   * const courses = await coursesService.findByTitle('JavaScript', 1, 10);
   */
  async findByTitle(
    search: string,
    page: number = 1,
    limit: number = 10,
    sortnumber: 1 | -1 = 1,
  ): Promise<Course[]> {
    const skip = (page - 1) * limit;
    return this.CourseModel.find({
      $or: [{ title: new RegExp(search, 'i') }],
    })
      .sort({ title: sortnumber })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  /**
   * Searches for courses by title, with pagination.
   *
   * @param {string} search - The search term to filter courses by title.
   * @param {number} [page=1] - The page number for pagination.
   * @param {number} [limit=10] - The number of courses to return per page.
   * @param {number} [sortnumber=1] - The sort order for the search results (1 for ascending, -1 for descending).
   * @returns {Promise<Course[]>} A list of courses that match the search criteria.
   *
   * @example
   * const courses = await coursesService.findByTitle('JavaScript', 1, 10);
   */
  async findByTitleAndInstructor(
    search: string,
    instructor: string,
    page: number = 1,
    limit: number = 10,
    sortnumber: 1 | -1 = 1,
  ): Promise<Course[]> {
    const skip = (page - 1) * limit;

    return this.CourseModel.find({
      $and: [
        { title: new RegExp(search, 'i') },
        { instructor: new RegExp(instructor, 'i') },
      ],
    })
      .sort({ title: sortnumber })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  /** Retrieves a course by ID.
   *
   * @param {string} id - The ID of the course to retrieve.
   * @returns {Promise<Course | null>} The course with the specified ID, or null if not found.
   *
   * @example
   * const course = await coursesService.findById('123');
   */
  async findById(id: string): Promise<Course | null> {
    return this.CourseModel.findById(id).exec();
  }
}
