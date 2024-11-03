import { configureStore } from "@reduxjs/toolkit";
import { CreateQuizSlice } from "./TeacherSlice/TeacherSlice";
import { ActivationQuizSlice } from "./ActivationSlice/ActivationSlice";
import { CreateAnswerSlice } from "./StudentSlice/StudentSlice";


export const store = configureStore({
  reducer: {
    addQuizInfo : CreateQuizSlice.reducer,
    activation : ActivationQuizSlice.reducer,
    addAnswerInfo: CreateAnswerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;