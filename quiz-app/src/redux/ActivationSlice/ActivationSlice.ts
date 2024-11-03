import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Activation {
  activate: boolean;
  quizId: string;
}

const initialState: Activation = {
  activate: false,
  quizId: "",
};

export const ActivationQuizSlice = createSlice({
  name: "active",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      postActivation.fulfilled,
      (state, action: PayloadAction<Activation>) => {
        state.activate = action.payload.activate;
        state.quizId = action.payload.quizId;
      }
    );
    builder.addCase(
      getLastActivation.fulfilled,
      (state, action: PayloadAction<Activation>) => {
        state.activate = action.payload.activate;
        state.quizId = action.payload.quizId;
      }
    );
    builder.addCase(
      findActivation.fulfilled,
      (state, action: PayloadAction<Activation>) => {
        state.activate = action.payload.activate;
        state.quizId = action.payload.quizId;
      }
    );
  },
});

export const postActivation = createAsyncThunk(
  "active/postActivation",
  async (activation: Activation) => {
    const response = await axios.post(
      "http://localhost:5000/activatedQuiz",
      activation
    );
    return response.data;
  }
);

export const getLastActivation = createAsyncThunk(
  "active/getLastActivation",
  async () => {
    const response = await axios.get("http://localhost:5000/activatedQuiz");
    const res = response.data[response.data.length - 1];
    return res || { activate: false, quizId: "" };
  }
);

export const findActivation = createAsyncThunk(
  "active/findActivation",
  async (id: string) => {
    const response = await axios.get(
      `http://localhost:5000/activatedQuiz?quizId=${id}`
    );
    return response.data;
  }
);
export default ActivationQuizSlice.reducer;
