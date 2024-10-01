import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document; // Ensure this line is present

/**
 * The schema for the Course model, representing a course in the database.
 */
@Schema()
export class Course {
  /**
   * The title of the course.
   * @type {string}
   * @required
   * @index
   */
  @Prop({ required: true, index: true })
  title: string;

  /**
   * A brief description of the course content.
   * @type {string}
   * @required
   */
  @Prop({ required: true })
  description: string;

  /**
   * The instructor responsible for the course.
   * @type {string}
   * @required
   * @index
   */
  @Prop({ required: true, index: true })
  instructor: string;

  /**
   * The schedule or timeline for the course.
   * @type {string}
   * @required
   */
  @Prop({ required: true })
  schedule: string;
}

/**
 * The Mongoose schema for the Course model.
 */
export const CourseSchema = SchemaFactory.createForClass(Course);
