import { historySearchState, IResponseGetCurrentWeather } from "@/utils/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const setHistorySearch = createAsyncThunk<IResponseGetCurrentWeather, IResponseGetCurrentWeather>(
    "/historySearch",
    (pageActive: IResponseGetCurrentWeather) => {
        return pageActive;
    }
);

const initialState: historySearchState = {
    historySearch: null,
    loading: false,
    error: false,
};

export const historySearchSlice = createSlice({
    name: "historySearch",
    initialState,
    reducers: {
        resetStoreHistorySearch: (state) => {
            state.historySearch = null;
            state.loading = false;
            state.error = false;
        },
    },
    extraReducers: (builder) => {

        builder.addCase(setHistorySearch.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(setHistorySearch.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });

        builder.addCase(setHistorySearch.fulfilled, (state, action) => {
            state.historySearch = [...(state.historySearch || []), action.payload]
            state.loading = false;
        });
    },
});

export const { resetStoreHistorySearch } = historySearchSlice.actions;

export default historySearchSlice.reducer;
