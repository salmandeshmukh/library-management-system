import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import bookReducer from "../features/bookSlice";
import themeReducer from "../features/themeSlice";
import borrowReducer from "../features/borrowSlice";
import dashboardReducer from "../features/dashboardSlice";
import borrowRequestReducer from "../features/borrowRequestSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    theme: themeReducer,
    borrow: borrowReducer,
    dashboard: dashboardReducer,
    borrowRequest: borrowRequestReducer,
  },
});
