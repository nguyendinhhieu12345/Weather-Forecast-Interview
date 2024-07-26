import { KeySearchState } from "@/utils/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const setKeySeach = createAsyncThunk<string, string>(
    "/keySearch",
    (keySearch: string) => {
        return keySearch;
    }
);

const initialState: KeySearchState = {
    keySearch: "",
    loading: false,
    error: false,
};

export const keySearchSlice = createSlice({
    name: "keySearch",
    initialState,
    reducers: {
        resetStoreKeySearch: (state) => {
            state.keySearch = "";
            state.loading = false;
            state.error = false;
        },
    },
    extraReducers: (builder) => {

        builder.addCase(setKeySeach.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(setKeySeach.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });

        builder.addCase(setKeySeach.fulfilled, (state, action) => {
            state.keySearch = action.payload
            state.loading = false;
        });
    },
});

export const { resetStoreKeySearch } = keySearchSlice.actions;

export default keySearchSlice.reducer;
