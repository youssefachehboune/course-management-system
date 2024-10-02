import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

/**
 * The schema for the Course model, representing a course in the database.
 */
@Schema({ timestamps: true })
export class Course {
  /**
   * The title of the course.
   * @type {string}
   * @required
   */
  @Prop({ required: true })
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
   */
  @Prop({ required: true })
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

// Create a text index on 'title' and 'description' for text search
CourseSchema.index({ title: 'text', description: 'text' });

// Optionally, create a compound index on 'instructor' if you want fast instructor searches
CourseSchema.index({ instructor: 1 });
