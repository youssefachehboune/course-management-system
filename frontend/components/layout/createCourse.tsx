import React, { useEffect } from 'react'
import HeaderCard from '../headerCard'
import TextInput from '../textInput'
import { CourseLib } from '@/apiClient/services/course.service';

const Days = [
  { short: "Mon", long: "Monday" },
  { short: "Tue", long: "Tuesday" },
  { short: "Wed", long: "Wednesday" },
  { short: "Thu", long: "Thursday" },
  { short: "Fri", long: "Friday" },
  { short: "Sat", long: "Saturday" },
  { short: "Sun", long: "Sunday" }
]

/**
 * The properties of the CreateCourse component.
 */
interface CreateCourseProps {
  /**
   * A function to call when a course is selected.
   * @param {string} component - The component to select.
   */
  onSelect: (component: string) => void;
}
/**
 * A component for creating a course.
 *
 * @param {CreateCourseProps} props - The properties of the component.
 * @prop {function} onSelect - A function to call when a course is selected.
 *
 * @example
 * <CreateCourse onSelect={() => console.log("Course selected")} />
 */
export default function CreateCourse({ onSelect }: CreateCourseProps) {
  const [courseData, setCourseData] = React.useState<{
    title: string;
    description: string;
    schedule: string;
  }>({
    title: '',
    description: '',
    schedule: '', // it will be like this : "Monday 9:00"
  });
const [shudeuleDay, setShudeuleDay] = React.useState<string>("");
const [shudeuleHour, setShudeuleHour] = React.useState<number>(0);
const [shudeuleMinute, setShudeuleMinute] = React.useState<number>(0);

const [loading, setLoading] = React.useState<boolean>(false);
const [error, setError] = React.useState<string>("");
useEffect(() => {
  const schedule = `${shudeuleDay} ${shudeuleHour}:${shudeuleMinute}`;
  setCourseData({ ...courseData, schedule });
}, [shudeuleDay, shudeuleHour, shudeuleMinute]);


  /**
   * Handles the submission of the course creation form.
   *
   * Submits a POST request to the server to create a course, and then resets the form
   * and calls the onSelect function with the argument "home", to move the user to the
   * home component.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   *
   * @throws {Error} If the course creation fails.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await CourseLib.CreateCourse(courseData);
      // console.log(response);
      setLoading(false);
      setCourseData({
        title: '',
        description: '',
        schedule: '',
      })
      onSelect("home");
    } catch {
      setLoading(false);
      setError("An unexpected error occurred. Please try again later.");
    }
  };
  
  return (
    <div className="w-full h-full px-7 flex flex-col gap-6 pb-6">

      <div className="w-full  flex flex-col">
        <HeaderCard title="Create course" />
      </div>
      <form className='w-full h-full flex flex-col justify-between' onSubmit={handleSubmit}>
        <div className='w-full flex flex-col gap-4'>
        <TextInput
          value={courseData.title}
          onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
          placeholder="Title"
          type="text"
          error={null}
          disabled={false}
          large={false}
          />
        <TextInput
          value={courseData.description}
          onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
          placeholder="Description"
          type="text"
          error={null}
          disabled={false}
          large={true}
          />
        <div className='flex justify-start items-start flex-col gap-3'>
          <h6 className="font-light text-[12px] tracking-wider">Select The schedule day:</h6>
          <div className='flex flex-row w-full justify-start gap-2 items-center'>
            {Days.map((day) => (
              <div className={`w-fit text-center px-[12px] py-[10px] flex flex-row items-center justify-center gap-2 rounded-[7px] border-[0.4px] border-[#00000010] drop-shadow-[0_-2px_6px_rgba(0,0,0,0.02)] ${day.long === shudeuleDay ? "bg-[#000000] text-white" : ""}`}
                onClick={() => setShudeuleDay(day.long)}
                key={day.short}
                style={{ cursor: "pointer" }}

              >
                <h2 className="text-[12px] font-light leading-[150%] tracking-[5%]">{day.short}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className='flex justify-start items-start flex-col gap-3'>
          <h6 className="font-light text-[12px] tracking-wider">Select The schedule Time:</h6>
          <div className='flex flex-row justify-start gap-2 items-center'>
              <input className="w-10 text-center text-black text-[12px] font-light leading-[150%] tracking-[5%] py-[10px] rounded-[7px] border-[0.4px] border-[#00000010] bg-white drop-shadow-[0_-2px_6px_rgba(0,0,0,0.02)]"
                placeholder={"00"}
                value={shudeuleHour}
                type='number'
                min={0}
                max={23}
                onChange={(e) => setShudeuleHour(Number(e.target.value))}
                />
              :
              <input className="w-10 text-center text-black text-[12px] font-light leading-[150%] tracking-[5%] py-[10px] rounded-[7px] border-[0.4px] border-[#00000010] bg-white drop-shadow-[0_-2px_6px_rgba(0,0,0,0.02)]"
                value={shudeuleMinute}
                type='number'
                onChange={(e) => setShudeuleMinute(Number(e.target.value))}
                min={0}
                max={59}
                placeholder={"00"}
                />
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        </div>
        <button
            type="submit"
            className={`rounded-[4px] min-w-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ${(courseData.title === '') ? 'bg-gray-400 cursor-not-allowed' : 'bg-black'}`}
            
          >
            {loading ? (
              "Creating course..."
            ) : (
              "Create course"
            )}
          </button>
      </form>
    </div>
  )
}
