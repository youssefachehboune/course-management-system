
import axiosInstance  from "../axios-instance";

export type CreateUserType = {
    username: string;
    fullName: string;
    password: string;
};

export type LoginUserType = {
    username: string;
    password: string;
};

export const AuthLib = {
  /**
   * Creates a new user in the chat system.
   * @param {LoginUserType} data - The user's first and last name.
   * @returns {Promise<any>} The created user data.
   * @throws {Error} If the user creation fails.
   */
  LoginUser: async (data: LoginUserType): Promise<any> => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      return response.data;
    } catch (error: any) {
      
      if (error.response?.status === 401) {
        throw new Error("Invalid credentials. Please try again.");
      }

      if (error.response?.status === 500) {
        throw new Error("Internal server error. Please try again later.");
      }

      if (error.response?.status === 400) {
        throw new Error("Invalid request. Please check your input.");
      }

      if (error.response?.status === 404) {
        throw new Error("User not found. Please try again.");
      }

      throw new Error("An unexpected error occurred. Please try again later.");

    }
  },

  /**
   * Creates a new user in the chat system.
   * @param {CreateUserType} data - The user's first and last name.
   * @returns {Promise<any>} The created user data.
   * @throws {Error} If the user creation fails.
   */
  CreateUser: async (data: CreateUserType): Promise<any> => {
    try {
      const response = await axiosInstance.post("auth/register", data);
      return response.data;
    } catch (error: any) {

      if (error.response?.status === 500) {
        throw new Error("Internal server error. Please try again later.");
      }

      if (error.response?.status === 400) {
        throw new Error("Invalid request. Please check your input.");
      }

      if (error.response?.status === 409) {
        throw new Error("User already exists. Please try again.");
      }

      throw new Error("An unexpected error occurred. Please try again later.");
      
    }
  },

  /**
   * Gets the user courses.
   * @returns {Promise<any>} The user courses data.
   * @throws {Error} If the user courses retrieval fails.
   */
  GetUserCourses: async (): Promise<any> => {
    try {
      const response = await axiosInstance.get("users/mycourses");
      return response.data;
    } catch (error: any) {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  },

};
