import { ProfileCircle } from 'iconsax-react'
import React from 'react'

/**
 * The properties of the CourseCard component.
 *
 * @prop {string} title - The title of the course.
 * @prop {string} instructor - The instructor of the course.
 * @prop {string} description - The description of the course.
 * @prop {string} [shudeule] - The schedule of the course.
 * @prop {boolean} [newCourse] - Whether the course is new or not.
 */
interface CourseCardProps {
    title: string
    instructor: string
    description: string
    shudeule?: string
    newCourse?: boolean
}


/**
 * A component for displaying a course.
 *
 * @param {CourseCardProps} props - The properties of the component.
 * @returns {React.ReactElement} The component.
 *
 * @example
 * <CourseCard title="Course Title" instructor="Course Instructor" description="Course Description" />
 */
const CourseCard: React.FC<CourseCardProps> = ({ title, instructor, description, shudeule, newCourse }) => {
    return (
        <div className={`w-full text-start flex flex-col gap-[7px] p-[16px] rounded-[12px] ${newCourse === true ? 'bg-[#E3FFE8]' : 'bg-white'} border-[0.2px] border-[#00000010] drop-shadow-[0_-2px_6px_rgba(0,0,0,0.03)]`}>
            <h2 className="text-[14px] font-light tracking-wider">{title}</h2>
            <div className="flex flex-row items-center gap-[7px]">
                <ProfileCircle size={18} />
                <h4 className="text-[10px] font-medium tracking-wider">{instructor}</h4>
            </div>
            <p className="text-[10px] font-light tracking-[-0.04em] leading-[13px]">{description}</p>
        </div>
    )
}

export default CourseCard




/**
 * A skeleton component for a course card.
 *
 * This component displays a skeleton of a course card, which is useful for displaying a loading state.
 *
 * @returns The skeleton component.
 */
export const CourseCardSkeleton = () => {
    return (
        <div className="w-full text-start flex flex-col gap-[7px] p-[16px] rounded-[12px] bg-[#00000010] border-[0.2px] border-[#00000010] drop-shadow-[0_-2px_6px_rgba(0,0,0,0.05)] animate-pulse">
            <h2 className="text-[14px] font-light tracking-wider bg-[#00000010] h-5 animate-shimmer"></h2>
            <div className="flex flex-row items-center gap-[7px] h-4 bg-[#00000010] animate-shimmer"></div>
            <p className="text-[10px] font-light tracking-[-0.04em] h-[13px] bg-[#00000010] animate-shimmer"></p>
            <p className="text-[10px] w-5/6 font-light tracking-[-0.04em] h-[13px] bg-[#00000010] animate-shimmer"></p>
        </div>
    )
}
