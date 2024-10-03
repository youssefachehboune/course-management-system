import { Course } from "@/components/home";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionSlicetype {
  isAuth: boolean;
  courses: Course[];
}

const initialState: SessionSlicetype = {
  isAuth: false,
  courses: [],
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    changeDataSession: (
      state,
      { payload }: PayloadAction<Partial<SessionSlicetype>>,
    ) => ({ ...state, ...payload }),
    reset: () => initialState,
  },
});

export const { changeDataSession, reset: resetSession } = sessionSlice.actions;

export default sessionSlice.reducer;
