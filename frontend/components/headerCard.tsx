import React from 'react'


/**
 * The properties of the HeaderCard component.
 *
 * @property {string} title - The title of the header.
 * @property {string} [subTitle] - The subtitle of the header.
 * @property {ReactNode} [children] - The child components of the header.
 */
interface HeaderCardProps {
    /**
     * The title of the header.
     */
    title: string
    /**
     * The subtitle of the header.
     */
    subTitle?: string;
    /**
     * The child components of the header.
     */
    children?: React.ReactNode
}

/**
 * A component for displaying a header with a title and an optional subtitle.
 *
 * If a subTitle is provided, it will be displayed below the title. If no subTitle is provided, only the title will be shown.
 *
 * @param {HeaderCardProps} props - The properties of the component.
 * @returns {React.ReactElement} The component.
 *
 * @example
 * <HeaderCard title="Course Title" subTitle="Course Instructor" />
 */
const HeaderCard = ({ title, subTitle, children }: HeaderCardProps) => {
    if (subTitle) {
        return (
            <div className="w-full text-center px-10 py-10 flex flex-col gap-2 rounded-[12px] bg-white drop-shadow-[0_-2px_6px_rgba(0,0,0,0.03)]">
              <h2 className="text-3xl font-light">{title}</h2>
              <p className="text-md font-light">{subTitle}</p>
              {children}
            </div>
        )
    } else {
        return (
            <div className="w-full text-center px-10 py-10 flex flex-col gap-2 rounded-[12px] bg-white drop-shadow-[0_-2px_6px_rgba(0,0,0,0.03)]">
              <h2 className="text-3xl font-light">{title}</h2>
              {children}
            </div>
        )
    }
}


export default HeaderCard