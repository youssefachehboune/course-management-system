"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * ReactQueryProvider is a higher-order component that wraps the application or a part of it
 * with the QueryClientProvider from 'react-query'. This is necessary to use the features of
 * 'react-query' such as data fetching, caching, synchronization and updates in the child components.
 *
 * @param {Object} props - The properties that define the component.
 * @param {JSX.Element} props.children - The child components that this provider will wrap.
 *
 * @returns {JSX.Element} The QueryClientProvider component wrapping the child components.
 */

export default function ReactQueryProvider({
  children,
}: {
  children: JSX.Element;
}) {
  // Create a new instance of QueryClient. This will be used to configure our 'react-query' instance.
  const queryClient = new QueryClient();
  // Return the QueryClientProvider component. This wraps the child components and provides them
  // with the 'react-query' context, enabling them to use the 'react-query' features.
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
