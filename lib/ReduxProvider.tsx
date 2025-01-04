"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import useInit from "@/utils/useInit";

type ReduxProviderProps = {
  children: React.ReactNode;
};

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <Init>{children}</Init>
    </Provider>
  );
}

function Init({ children }: ReduxProviderProps) {
  useInit();
  return <>{children}</>;
}
