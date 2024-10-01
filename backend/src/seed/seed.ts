import * as dotenv from 'dotenv';
dotenv.config();
import * as fs from 'node:fs';
import * as path from 'node:path';

import { NestFactory } from '@nestjs/core';
import { Presets, SingleBar } from 'cli-progress';
import { connect, disconnect } from 'mongoose';

import { AppModule } from '../../src/app.module';
import { CoursesService } from '../courses/courses.service';
import { CreateCourseDto } from '../courses/dto/create-course.dto';
import { bootstrap } from '../main';

/**
 * Seeds the courses data into the database.
 *
 * This function reads the courses data from a JSON file,
 * connects to the MongoDB database using Mongoose, and inserts
 * the courses into the database using the `CoursesService`.
 *
 * A CLI progress bar is used to track the progress of the operation.
 *
 * @async
 * @throws {Error} Throws an error if the `MONGODB_URI` environment variable is not defined.
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
    // Read the courses data from a JSON file
    const jsonData = fs.readFileSync(
      path.join(__dirname, 'data', 'courses_data.json'),
      'utf8',
    );
    courses = JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading courses data:', error);
    process.exit(1);
  }

  // Initialize the progress bar
  const progressBar = new SingleBar(
    {
      format: 'Seeding Courses |{bar}| {percentage}% | {value}/{total} Courses',
    },
    Presets.shades_classic,
  );
  progressBar.start(courses.length, 0);

  // Seed the courses into the database
  for (const [index, course] of courses.entries()) {
    await coursesService.create(course); // Insert course into database
    progressBar.update(index + 1); // Update the progress bar
  }

  progressBar.stop(); // Stop the progress bar after completion
  await disconnect(); // Disconnect from MongoDB
  console.log(`Seeding completed! Total courses seeded: ${courses.length}`);
};

/**
 * Executes the `seedCourses` function and handles any errors.
 * If an error occurs, it logs the error message and terminates the process.
 */
seedCourses().catch(error => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
