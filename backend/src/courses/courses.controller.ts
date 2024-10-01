import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'; // Import Swagger decorators

import { Course } from './course.schema';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

@ApiTags('courses') // Group the endpoints under "Courses" in the Swagger UI
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  /**
   * Creates a new course.
   *
   * @param {CreateCourseDto} createCourseDto - The data transfer object for creating a course.
   * @returns {Promise<Course>} The created course.
   *
   * @example
   * // Example body
   * {
   * {
   *   "title": "Compatible user-facing hierarchy",
   *   "description": "Modern consider if. Girl current truth work available chair write.",
   *   "instructor": "Michael Gill",
   *   "schedule": "Thursday 13:00"
   * }
   */
  @ApiOperation({ summary: 'Create a new course' }) // Adds a summary for Swagger UI
  @ApiResponse({
    status: 201,
    description: 'The course has been successfully created.',
    type: Course,
    example: {
      statusCode: 201,
      timestamp: '2024-10-01T20:36:28.656Z',
      path: '/courses',
      data: {
        title: 'Compatible user-facing hierarchy',
        description:
          'Modern consider if. Girl current truth work available chair write.',
        instructor: 'Michael Gill',
        schedule: 'Thursday 13:00',
        _id: '66fc5d4cded2ee9bc68a8f4e',
        __v: 0,
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiBody({
    type: CreateCourseDto,
    examples: {
      example1: {
        summary: 'Create course',
        value: {
          title: 'Compatible user-facing hierarchy',
          description:
            'Modern consider if. Girl current truth work available chair write.',
          instructor: 'Michael Gill',
          schedule: 'Thursday 13:00',
        },
      },
    },
  })
  @Post()
  create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.create(createCourseDto);
  }

  /**
   * Retrieves all courses or searches for courses by title.
   *
   * If a `search` query is provided, it searches for courses that match the
   * title. Pagination is supported through the `page` and `limit` query parameters.
   *
   * @param {string} [search] - The search term for filtering courses by title.
   * @param {number} [page=1] - The page number for pagination (default is 1).
   * @param {number} [limit=10] - The number of courses to return per page (default is 10).
   * @param {number} [sortnumber=1] - The sort order for the search results (1 for ascending, -1 for descending).
   * @returns {Promise<Course[]>} A list of courses that match the search term or all courses if no search term is provided.
   *
   * @example
   * // Example request: /courses?search=JavaScript&page=1&limit=10
   */
  @ApiOperation({ summary: 'Retrieve courses or search by title' }) // Swagger operation description
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the courses.',
    type: [Course],
    example: {
      statusCode: 200,
      timestamp: '2024-10-01T20:37:22.599Z',
      path: '/courses?page=1&limit=10',
      data: [
        {
          _id: '66fc4fab075f07e6e8396f36',
          title: 'Open-architected bandwidth-monitored contingency',
          description:
            'Theory president share Republican soon figure. She skill his as bit raise. Bring notice every big onto institution behind listen. Character will way old.',
          instructor: 'Beth Williamson',
          schedule: 'Tuesday 10:00',
          __v: 0,
        },
        '...',
      ],
    },
  })
  @ApiResponse({ status: 404, description: 'Courses not found.' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search term for filtering by title',
  })
  @ApiQuery({
      name: 'instructor',
      required: false,
      description: 'Search term for filtering by instructor',
      example: 'Michael Gill'
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of results per page',
    example: 10,
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'Sort order (1 for ascending, -1 for descending)',
    type: Number,
    example: 1,
  })
  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('instructor') instructor?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: Number = 1,
  ): Promise<Course[]> {
    if (search) {
        if(instructor) {
         return this.coursesService.findByTitleAndInstructor(search, instructor, page, limit, Number(sort) as 1 | -1);    
        }
      return this.coursesService.findByTitle(search, page, limit, Number(sort) as 1 | -1);
    }
    return this.coursesService.findAll(page, limit);
  }
}
