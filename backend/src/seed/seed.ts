/* eslint-disable  no-console, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call*/
import * as dotenv from 'dotenv';
dotenv.config();
const path = require('path');
const fs = require('fs');
import { NestFactory } from '@nestjs/core';
import { Presets, SingleBar } from 'cli-progress';
import { connect, disconnect } from 'mongoose';
import { AppModule } from '../../src/app.module';
import { CoursesService } from '../courses/courses.service';
import { CreateCourseDto } from '../courses/dto/create-course.dto';

/**
 * Seeds the courses data into the database.
 *
 * This function reads the courses data from a JSON file,
 * connects to the MongoDB database using Mongoose, and inserts
 * the courses into the database using the CoursesService.
 *
 * A CLI progress bar is used to track the progress of the operation.
 *
 * @async
 * @throws {Error} Throws an error if the MONGODB_URI environment variable is not defined.
 * @throws {Error} Throws an error if there's an issue reading the courses data file.
 */
const seedCourses = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const coursesService = app.get(CoursesService);
  const mongodbUri = process.env.MONGODB_URI;

  if (!mongodbUri) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  await connect(mongodbUri);

  let courses: CreateCourseDto[];
  try {
    const filePath = path.resolve(__dirname, 'data', 'courses_data.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    courses = JSON.parse(jsonData);
  } catch (error) {
    throw new Error('Error reading courses data');
  }

  const progressBar = new SingleBar(
    { format: 'Seeding Courses |{bar}| {percentage}% | {value}/{total} Courses' },
    Presets.shades_classic,
  );
  progressBar.start(courses.length, 0);

  for (const [index, course] of courses.entries()) {
    await coursesService.create(course);
    progressBar.update(index + 1);
  }

  progressBar.stop();
  await disconnect();
  console.log(`Seeding completed! Total courses seeded: ${courses.length}`);
};

seedCourses().catch(error => {
  console.error('Seeding failed:', error);
  throw error;
});