"useClient";
import React, { useCallback, useEffect, useState } from 'react'

import { CourseLib } from '@/apiClient/services/course.service';
import { Course } from './home';
import HeaderCard from '../headerCard';
import CourseCard from '../courseCard';
import { ArrowDown, ArrowUp, SearchNormal } from 'iconsax-react';

/**
 * A page for searching courses.
 *
 * This page contains a search bar, a count of the number of search results, and a list of courses that match the search criteria. The list is scrollable and uses infinite scrolling to load more courses as the user scrolls down.
 *
 * @returns A React component that displays a search page.
 */
export default function Search() {
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<number>(1); // 1 for ascending, -1 for descending
  // Fetch courses on page load and when page changes
  const fetchCourses = async (limit = 10, save = true) => {
    setLoading(true);
    try {
      const response = await CourseLib.GetCourses(page, 10, search, sort);
      const newCourses = response.data; // Access the data property

      if (Array.isArray(newCourses)) {
        if (newCourses.length === 0) {
          setHasMore(false);
        } else {
          if(save) {
            setCourses((prevCourses) => [...prevCourses, ...newCourses]);
          }
          else {
            setCourses(newCourses);
          }
        }
      } else {
        console.error("Expected an array, but got:", newCourses);
        setHasMore(false); // Stop loading if the response is invalid
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if(search.length > 0) {
      fetchCourses(10 ,false);
    }
  }, [search]);

  useEffect(() => {
    if(search.length !== 0) {
      fetchCourses(10, true);
    }
  }, [page]);

  useEffect(() => {
    if(search.length !== 0) {
      // scroll to top when page changes
      const container = document.getElementById("course-container");
      if (container) {
        container.scrollTop = 0;
      }
      fetchCourses(10, false);
    }
  }, [sort]);

  // handel sort 
  const handleSort = () => {
    setSort((prevSort) => {
      if (prevSort === 1) {
        return -1;
      } else {
        return 1;
      }
    });
  };


  // Infinite scrolling for the second section
  const handleScroll = useCallback(() => {
    const container = document.getElementById("course-container");
    if (container && container.scrollTop + container.clientHeight >= container.scrollHeight - 100 && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, loading]);
  return (
    <div className="w-full h-full px-7 pb-6 flex flex-col gap-6">

      <div className="w-full  flex flex-col gap-6">
        <HeaderCard title="Search for course">
          <div className='flex items-center bg-white p-[10px] mt-5 rounded-[4px] border-[0.2px] border-[#00000030]'>
            <SearchNormal size={13} className='mx-2 text-[#00000020]' />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="search"
              name="search"
              autoComplete="off"
              className='flex-grow h-full border-none outline-none px-[2px] text-[12px] placeholder:text-[#00000020] focus:text-black focus:ring-0 ring-0'
            />
          </div>
        </HeaderCard>

      </div>
      

      {/* Second section: Scrollable course list */}
      {courses && courses.length > 0 &&
      <>
        <div className='flex flex-row w-full justify-between items-end'>
        {/* <div className="w-fit text-center px-[12px] py-[10px] flex flex-row items-center justify-center gap-2 rounded-[7px] border-[0.4px] border-[#00000010] bg-white drop-shadow-[0_-2px_6px_rgba(0,0,0,0.02)]">
          <h2 className="text-[12px] font-light leading-[150%] tracking-[5%]">Select instructor</h2>
          <ArrowDown2 size={10} />
        </div> */}
        <h6 className="font-light text-[12px] tracking-wider">{courses.length} results</h6>
        <button className="w-fit text-center px-[12px] py-[10px] flex flex-row items-center justify-center gap-2 rounded-[7px] border-[0.4px] border-[#00000010] bg-white drop-shadow-[0_-2px_6px_rgba(0,0,0,0.02)]" onClick={handleSort}>
            {sort === 1 ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
          <h2 className="text-[12px] font-light leading-[150%] tracking-[5%]">Sort By <span className='font-medium'>Title</span></h2>
        </button>
      </div>
      <section className="w-full bg-green-50 h-full flex flex-col gap-2 overflow-hidden">
        <div
          id="course-container"
          className="w-full flex flex-col gap-6 overflow-y-auto"
          onScroll={handleScroll}
          >
          {courses.map((course, index) => (
            <CourseCard
            key={index}
            title={course.title}
            instructor={course.instructor}
            description={course.description}
            shudeule={course.schedule}
            />
          ))}
          {/* {loading && <CourseCardSkeleton />} */}
        </div>
      </section>
      </>
        }
    </div>
  )
}
