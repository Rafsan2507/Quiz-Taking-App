import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
export interface QuizAnswers {
id?: string;
  title: string;
  duration: number;
  quizId?: string;
  answers: Answer[];
}

export interface Answer {
  question: string;
  answer: string;
}

const initialState: QuizAnswers[] = [];

export const CreateAnswerSlice = createSlice({
  name: "quizAnswer",
  initialState,
  reducers: {
    addAnswerInfo: (state, action: PayloadAction<QuizAnswers>) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      QuizAnswerInfo.fulfilled,
      (state, action: PayloadAction<QuizAnswers>) => {
        state.push(action.payload);
      }
    );
  }
  
});

export const QuizAnswerInfo = createAsyncThunk(
  "quiz/QuizAnswerInfo",
  async (quizData: QuizAnswers) => {
    const response = await axios.post(
      "http://localhost:5000/quizAnswer",
      quizData
    );
    return response.data;
  }
); 


export default CreateAnswerSlice.reducer;
export const { addAnswerInfo } = CreateAnswerSlice.actions;
