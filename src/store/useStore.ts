import { configureStore } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { rootReducer } from "./rootReducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

const useLogger = process.env.NODE_ENV !== "production";

const initailizeStore = () => {
  const middleware: any[] = [thunk];
  if (useLogger) {
    middleware.push(logger);
  }

  const store = configureStore({ reducer: rootReducer, middleware: [] });
  return store;
};

export function useStore() {
  const store = useMemo(() => initailizeStore(), []);
  return store;
}
