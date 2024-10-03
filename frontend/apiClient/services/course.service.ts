
import { axiosInstance } from "../axios-instance";


export type CreateCourseType = {
  title: string;
  description: string;
  schedule: string;
};

export const CourseLib = {
 
  /**
   * Creates a new course in the chat system.
   * @param {CreateCourseType} data - The course data.
   * @returns {Promise<any>} The created course data.
   * @throws {Error} If the course creation fails.
   */
  CreateCourse: async (data: CreateCourseType): Promise<any> => {
    try {
      const response = await axiosInstance.post("/courses", data);
      return response.data;
    } catch (error: any) {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  },

  /**
   * Get all courses
   * @returns {Promise<any>} The created course data.
   * @throws {Error} If the course creation fails.
   */
  GetCourses: async (
    page?: number,
    limit?: number,
    search?: string,
    sort?: number
  ): Promise<any> => {
    try {
      const response = await axiosInstance.get("/courses", {
        params: {
          page,
          limit,
          search,
          sort
        },
      }
      );
      return response.data;
    } catch (error: any) {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  },

  /**
   * Get course by id
   * @returns {Promise<any>} The created course data.
   * @throws {Error} If the course creation fails.
   */
  GetCourseById: async (id: string): Promise<any> => {
    try {
      const response = await axiosInstance.get(`/courses/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  },


};
