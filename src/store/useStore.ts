import { configureStore } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { rootReducer } from "./rootReducer";

const initailizeStore = () => {
  return configureStore({ reducer: rootReducer });
};

export function useStore() {
  const store = useMemo(() => initailizeStore(), []);
  return store;
}
