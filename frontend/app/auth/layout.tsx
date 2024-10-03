"use client";

import Navbar from "@/components/common/navbar";
import withNoAuth from "@/components/withNoAuth";
/**
 * A layout component for authentication pages.
 *
 * This component takes a children prop which should contain the content of the page.
 * The component renders a Navbar with a Go Back button and the children prop.
 *
 * @example
 * import { AuthLayout } from "@/app/auth/layout";
 *
 * <AuthLayout>
 *     <LoginForm />
 * </AuthLayout>
 *
 * @param {ReactNode} children - The content of the page.
 * @returns {JSX.Element} The rendered component.
 */
const AuthLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) =>  {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <Navbar  withGoBack={true}/>
            {children}
        </div>
    );
}

export default withNoAuth(AuthLayout)