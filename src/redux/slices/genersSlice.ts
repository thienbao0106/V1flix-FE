import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: any = {
  listGeners: [],
  status: String,
};

export const fetchGeners = createAsyncThunk(
  "geners/fetchGeners",
  async (thunkAPI: any) => {
    console.log("test");
    const response = await axios.get(
      `${import.meta.env.VITE_USER_URL}/geners`,
      {
        signal: thunkAPI.signal,
      }
    );
    console.log(response.data);
    return response.data;
  }
);

const genersSlice = createSlice({
  name: "geners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGeners.fulfilled, (state: any, action: any) => {
      console.log(action.payload);
      console.log({
        status: action.payload.status,
        listGeners: action.payload.geners,
      });
      return {
        status: action.payload.status,
        listGeners: action.payload.geners,
      };
    });
    builder.addCase(fetchGeners.pending, (state: any, action: any) => {
      console.log("test");
    });
    builder.addCase(fetchGeners.rejected, (state: any, action: any) => {
      console.log("error");
    });
  },
});

export default genersSlice.reducer;
