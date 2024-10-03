"use client";
import Navbar from "@/components/common/navbar";
import BottomBar from "../components/common/bottomBar";
import HomeComponent from "@/components/layout/home";
import CreateCourse from '../components/layout/createCourse';
import Search from "@/components/layout/search";
import { useState } from "react";


/**
 * The home page component.
 *
 * This component renders either the home component, the search component, or the create course component,
 * depending on the selectedComponent state.
 *
 * The selectedComponent state is set to 'home' by default and can be set to 'search' or 'createCourse'
 * by clicking on the respective nav links in the navbar.
 *
 * @returns The home page component.
 */
export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState<string>('home');

  /**
   * Renders the component based on the selectedComponent state.
   *
   * If the selectedComponent is 'home', it renders the HomeComponent.
   * If the selectedComponent is 'search', it renders the Search component.
   * If the selectedComponent is 'createCourse', it renders the CreateCourse component.
   * If the selectedComponent is anything else, it renders the HomeComponent by default.
   *
   * @returns The rendered component.
   */
  const renderComponent = () => {
    /**
     * Switches between the different components based on the selectedComponent state.
     *
     * @param {string} selectedComponent - The state that determines which component to render.
     * @returns The rendered component.
     */
    switch (selectedComponent) {
      /**
       * Renders the HomeComponent by default or if the selectedComponent is 'home'.
       */
      case 'home':
        return <HomeComponent />;
      /**
       * Renders the Search component if the selectedComponent is 'search'.
       */
      case 'search':
        return <Search />;
      /**
       * Renders the CreateCourse component if the selectedComponent is 'createCourse'.
       */
      case 'createCourse':
        return <CreateCourse onSelect={setSelectedComponent}/>;
      /**
       * Renders the HomeComponent by default if the selectedComponent is anything else.
       */
      default:
        return <HomeComponent />;
    }
  };

  return (
    <div className="h-screen py-20 font-poppins overflow-hidden flex flex-col items-center justify-center gap-16 sm:p-20">
      <Navbar withGoBack={false} />
      {renderComponent()}
      <BottomBar onSelect={setSelectedComponent} selected={selectedComponent} />
    </div>
  );
}
