"use client";
import React, { useEffect } from 'react'
import { Category, Edit, Login, Logout, SearchNormal } from "iconsax-react";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { changeDataSession } from '@/redux-store/slices/session.slice';
import { RootState } from '@/redux-store/store';

/**
 * The properties of the BottomBar component.
 *
 * @prop {function} onSelect - A function to call when a component is selected.
 * @prop {string} selected - The currently selected component.
 */
interface BottomBarProps {
  /**
   * A function to call when a component is selected.
   *
   * @param {string} component - The component that was selected.
   */
  onSelect: (component: string) => void;
  /**
   * The currently selected component.
   */
  selected: string;
}

  /**
   * The bottom bar component.
   *
   * This component renders a fixed bar at the bottom of the screen with buttons
   * for navigation and login/logout.
   *
   * @param {BottomBarProps} props - The properties of the component.
   * @returns {JSX.Element} The component.
   */
const BottomBar: React.FC<BottomBarProps> = ({ onSelect, selected }) => {
  // check if user is logged in
  const {isAuth} = useSelector((state: RootState) => state.session);
  const dispatch = useDispatch();

  const router = useRouter();
  /**
   * Logs out the user and removes the access token from the cookie.
   *
   * It also resets the session state by dispatching the `changeDataSession` action
   * with an empty array of courses and `isAuth` set to false.
   *
   * Finally, it calls the `onSelect` function with "home" as an argument to navigate
   * the user to the home page.
   */
  const handleLogout = () => {
    Cookies.remove('accessToken');
    dispatch(changeDataSession({courses: [],isAuth: false})) 
    onSelect("home");

  };

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      dispatch(changeDataSession({isAuth: true})) 
    } else {
      dispatch(changeDataSession({isAuth: false})) 
    }
  }, [dispatch]);

  /**
   * Navigates the user to the login page.
   */
  const login = () => {
    router.push('/auth/login');
  };

  return (
    <div className=" bottom-0 z-20 max-w-[500px] fixed flex gap-2 flex-col w-full py-[24px] px-[58px] rounded-t-[24px] bg-white drop-shadow-[0_-2px_6px_rgba(0,0,0,0.03)]">
      <div className="flex flex-row w-full h-min justify-between">
        <button onClick={() => onSelect("home")} className={`w-[24px] flex flex-col items-center ${selected !== "home" ? "text-[#68667350]" : "text-[686673]"} `} >
          <Category size={24} />
          {selected === "home" && <div className="h-2 w-[15px] mt-2 rounded-full bg-black"></div>}
        </button>
        <button className={`w-[24px] flex flex-col items-center ${selected !== "search" ? "text-[#68667350]" : "text-[686673]"} `} onClick={() => onSelect("search")}>
          <SearchNormal size={24} />
          {selected === "search" && <div className="h-2 w-[15px] mt-2 rounded-full bg-black"></div>}
        </button>

        {isAuth &&
          <button className={`w-[24px] flex flex-col items-center ${selected !== "createCourse" ? "text-[#68667350]" : "text-[686673]"} `} onClick={() => onSelect("createCourse")}>
            <Edit size={24} />
            {selected === "createCourse" && <div className="h-2 w-[15px] mt-2 rounded-full bg-black"></div>}
          </button>
        }
        <button className="w-[24px] flex flex-col items-center text-[#ff0000]" onClick={isAuth ? handleLogout : login}>
          {isAuth ? <Logout size="24" className='text-red-500' /> : <Login size="24" className='text-green-500' />}
        </button>
      </div>
    </div>
  )
}

export default BottomBar
