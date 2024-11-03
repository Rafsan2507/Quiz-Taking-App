import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Quizzes {
  quiz: QuizForm;
  quizzes: QuizForm[];
}

export interface QuizForm {
  id?: string;
  title: string;
  duration: number;
  mcqQuestions: MCQQuestion[];
  trueFalseQuestions: TrueFalseQuestion[];
}

export interface MCQQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface TrueFalseQuestion {
  question: string;
  options: string[];
  answer: string;
}
const initialState: Quizzes = {
  quiz: {
    id: "",
    title: "",
    duration: 0,
    mcqQuestions: [],
    trueFalseQuestions: [],
  },
  quizzes: [],
};

export const CreateQuizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    addQuizInfo: (state, action: PayloadAction<QuizForm>) => {
      state.quizzes.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(QuizInfo.fulfilled, (state, action) => {
      state.quizzes.push(action.payload);
    });
    builder.addCase(GetAllQuiz.fulfilled, (state, action) => {
      state.quizzes = action.payload;
    });
    builder.addCase(getQuizById.fulfilled, (state, action) => {
      state.quiz = action.payload;
    });
    builder.addCase(updateQuiz.fulfilled, (state, action) => {
      const index = state.quizzes.findIndex(
        (quiz) => quiz.id === action.payload.id
      );
      if (index !== -1) {
        state.quizzes[index] = action.payload;
      }
      state.quiz = action.payload;
    });
  },
});

export const QuizInfo = createAsyncThunk(
  "quiz/QuizInfo",
  async (quizData: QuizForm) => {
    const response = await axios.post(
      "http://localhost:5000/quizData",
      quizData
    );
    return response.data;
  }
);

export const GetAllQuiz = createAsyncThunk("quiz/GetAllQuiz", async () => {
  const response = await axios.get("http://localhost:5000/quizData");
  return response.data;
});

export const getQuizById = createAsyncThunk(
  "quiz/getQuizById",
  async (id: string) => {
    const response = await axios.get(`http://localhost:5000/quizData/${id}`);
    return response.data;
  }
);

export const updateQuiz = createAsyncThunk(
  "quiz/updateQuiz",
  async (quizData: QuizForm) => {
    const response = await axios.put(
      `http://localhost:5000/quizData/${quizData.id}`,
      quizData
    );
    return response.data;
  }
);

export default CreateQuizSlice.reducer;
export const { addQuizInfo } = CreateQuizSlice.actions;
