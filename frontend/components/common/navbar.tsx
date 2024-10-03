"use client";
import React from 'react';
import { ArrowLeft } from 'iconsax-react';
import { useRouter } from 'next/navigation';

/**
 * A component that renders a navigation bar at the top of the page.
 * The navbar will contain a back button if the `withGoBack` prop is true.
 * The navbar will contain the app name in the center.
 * The navbar will contain a blank space of 24x24 pixels on the right if `withGoBack` is true.
 * @param {{ withGoBack: boolean }} props - The props object.
 * @prop {boolean} withGoBack - Whether to render a back button or not.
 */
export default function Navbar({ withGoBack }: { withGoBack: boolean }) {
  
    const router = useRouter();
    /**
     * Navigate back to the previous page.
     *
     * This function is called when the back button is clicked in the navbar.
     */
    const handleGoBack = () => {
        router.back(); // Navigate back to the previous page
    };

    return (
        <div className={`w-full fixed top-0 z-10 bg-white flex flex-row items-center ${withGoBack ? 'justify-between' : 'justify-center'} p-4`}>
            {withGoBack && <ArrowLeft size={24} className='text-primary cursor-pointer' onClick={handleGoBack} />}
            <h1 className='font-semibold text-xl text-primary'>CMS</h1>
            {withGoBack && <div className='w-[24px] h-[24px]'></div>}
        </div>
    );
}
