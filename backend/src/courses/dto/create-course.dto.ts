import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * Data Transfer Object (DTO) for creating a course.
 */
export class CreateCourseDto {
  /**
   * The title of the course.
   * @type {string}
   * @required
   */
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * A brief description of the course content.
   * @type {string}
   * @required
   */
  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * The instructor responsible for teaching the course.
   * @type {string}
   * @required
   */
  @IsString()
  @IsOptional()
  instructor?: string;

  /**
   * The schedule or timeline for the course.
   * @type {string}
   * @required
   */
  @IsString()
  @IsNotEmpty()
  schedule: string;
}
