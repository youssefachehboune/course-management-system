"use client";
import React, { useCallback, useEffect, useState } from 'react'
import HeaderCard from '../headerCard'
import CourseCard, { CourseCardSkeleton } from '../courseCard'
import { CourseLib } from '@/apiClient/services/course.service';
import { AuthLib } from '@/apiClient/services';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux-store/store';
import { changeDataSession } from '@/redux-store/slices/session.slice';

/**
 * Represents a course.
 *
 * @property {string} id - The ID of the course.
 * @property {string} title - The title of the course.
 * @property {string} description - The description of the course.
 * @property {string} instructor - The instructor of the course.
 * @property {string} schedule - The schedule of the course.
 */
export interface Course {
  id: string;
    title: string;
    description: string;
    instructor: string;
    schedule: string;
  }

  
  /**
   * The home page component.
   *
   * This component renders two sections:
   * The first section is loaded only once and displays the user's courses.
   * The second section is scrollable and displays a list of courses.
   * The courses in the second section are fetched in batches of 10, and the user can scroll to load more courses.
   *
   * @returns The home page component.
   */
export default function HomeComponent() {
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [fetchedCourses, setFetchedCourses] = useState<Course[]>([]);
    const [logged, setLogged] = useState<boolean>(true);
    const dispatch = useDispatch();
    const { courses } = useSelector((state: RootState) => state.session);

  // Fetch userOwnedCourses on page load and when page changes
  useEffect(() => {
    /**
     * Fetches the user's courses.
     *
     * Dispatches the courses to the session slice of the Redux store.
     *
     * @throws {Error} If the user courses retrieval fails.
     */
    const fetchUserCourses = async () => {
      try {
        setLogged(false) ;
        const response = await AuthLib.GetUserCourses();
        const newCourses = response.data; // Access the data property
        dispatch(changeDataSession({courses: newCourses}))
      } catch {
        // console.error("Failed to fetch user courses:", error);
      }
    };
    if(logged)
      fetchUserCourses();
  });
  // Fetch courses on page load and when page changes
  useEffect(() => {
    /**
     * Fetches courses.
     *
     * Sets the loading state to true while fetching and false when done.
     * If the response is an array, it appends the new courses to the previous ones.
     * If the response is empty, it sets hasMore to false.
     * If the response is invalid, it logs an error and sets hasMore to false.
     * If the request fails, it logs an error.
     */
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await CourseLib.GetCourses(page);
        const newCourses = response.data; // Access the data property

        if (Array.isArray(newCourses)) {
          if (newCourses.length === 0) {
            setHasMore(false);
          } else {
            setFetchedCourses((prevCourses) => [...prevCourses, ...newCourses]);
          }
        } else {
          // console.error("Expected an array, but got:", newCourses);
          setHasMore(false); // Stop loading if the response is invalid
        }
      } catch {
        // console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchCourses();
  }, [page]);

  // Infinite scrolling for the second section
  const handleScroll = useCallback(() => {
    const container = document.getElementById("course-container");
    if (container && container.scrollTop + container.clientHeight >= container.scrollHeight - 100 && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, loading]);
  return (
    <div className="w-full flex flex-col gap-6 overflow-y-auto h-full " id="course-container" onScroll={handleScroll} >

      {/* First section: Loaded only once */}
      <div className="w-full px-7 flex flex-col gap-6 ">
        <HeaderCard title="Welcome," subTitle="Enjoy learning with us!, with over than 100000+ courses 🎉" />
        {courses.length > 0 && (
          
          <section className="flex flex-col gap-2">
          <h6 className="font-light text-[12px] tracking-wider font-poppins">Your courses:</h6>
          {courses.map((course, index) => (
            <div className='flex flex-col gap-6'
            key={index}
            >
            <CourseCard
            id={course.id}
              title={course.title}
              instructor={course.instructor}
              description={course.description}
              schedule={course.schedule}
              />
              </div>
          ))}
        </section>
        )}
      </div>

      {/* Second section: Scrollable course list */}
        <section className="w-full px-7  flex flex-col gap-2">
          <h6 className="font-light text-[12px] tracking-wider">Courses:</h6>
      <div
        className="w-full h-full flex flex-col gap-6 overflow-y-auto"
      >
          {fetchedCourses.map((course, index) => (
            <CourseCard
              id={course.id}
              key={index}
              title={course.title}
              instructor={course.instructor}
              description={course.description}
              schedule={course.schedule}
            />
          ))}
      </div>
          {loading && <CourseCardSkeleton />}
        </section>
      </div>
  )
}
