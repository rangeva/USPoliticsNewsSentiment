import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ArticlesData: [],
    NegativearticleData:[],
    Nextpaginationdata:[] ,
    loading: false,
    error: null,
    totalPositiveCount: 0, 
    totalNegativeCount: 0,
   
}

const authSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        ArticleSlice: (state, action) => {
            state.ArticlesData = action.payload;
            state.totalPositiveCount = action.payload.totalResults; 
        },

        NegativeArticleSlice: (state, action) => {
            state.NegativearticleData = action.payload;
            state.totalNegativeCount =action.payload.totalResults
        },
        NextpaginationSlice: (state, action) => {
            state.Nextpaginationdata = action.payload;
            state.totalNegativeCount =action.payload.totalResults
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
})

export const authReducer = authSlice.reducer;
export const { ArticleSlice, NegativeArticleSlice,NextpaginationSlice,setLoading, setError } = authSlice.actions;
