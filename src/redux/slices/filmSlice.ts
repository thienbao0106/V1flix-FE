import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ISeries } from "../../interface";

const initialState: any = {
  listFilms: [],
  status: String,
};

export const fetchFilmsTrending = createAsyncThunk(
  "films/fetchFilmsTrending",
  async (thunkAPI: any) => {
    console.log("test");
    const response = await axios.get(
      `${import.meta.env.VITE_USER_URL}/series`,
      {
        signal: thunkAPI.signal,
      }
    );
    console.log(response.data);
    return response.data;
  }
);

const filmSlice = createSlice({
  name: "films",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFilmsTrending.fulfilled, (state: any, action: any) => {
      const trendingData = action.payload.series
        .sort((a: ISeries, b: ISeries) => b.view - a.view)
        .slice(0, 5);
      return {
        status: action.payload.status,
        listFilms: trendingData,
      };
    });
    builder.addCase(fetchFilmsTrending.pending, (state: any, action: any) => {
      console.log("test");
    });
    builder.addCase(fetchFilmsTrending.rejected, (state: any, action: any) => {
      console.log("error");
    });
  },
});

export default filmSlice.reducer;
