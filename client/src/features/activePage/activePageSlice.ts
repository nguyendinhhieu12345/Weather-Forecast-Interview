import { ActivePageState } from "@/utils/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const setPageActive = createAsyncThunk<number, number>(
    "/activePage",
    (pageActive: number) => {
        return pageActive;
    }
);

const initialState: ActivePageState = {
    pageActive: 1,
    loading: false,
    error: false,
};

export const activePageSlice = createSlice({
    name: "activePage",
    initialState,
    reducers: {
        resetStorePageActive: (state) => {
            state.pageActive = 1;
            state.loading = false;
            state.error = false;
        },
    },
    extraReducers: (builder) => {

        builder.addCase(setPageActive.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(setPageActive.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });

        builder.addCase(setPageActive.fulfilled, (state, action) => {
            state.pageActive = action.payload
            state.loading = false;
        });
    },
});

export const { resetStorePageActive } = activePageSlice.actions;

export default activePageSlice.reducer;
