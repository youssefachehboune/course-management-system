"use client";

import { store } from "@/redux-store/store";
import type { ReactNode } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}
