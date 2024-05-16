import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ArticlesData: [],  
    NegativearticleData:[],
    // Nextpaginationdata:[] ,
    totalPositiveCount: 0, 
    totalNegativeCount: 0,
    nextPositive: null,
    nextNegative: null,
     loading: false,
    error: null,
   
}

const authSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
       
        ArticleSlice: (state, action) => {
            state.ArticlesData = action.payload;
            state.totalPositiveCount = action.payload.totalResults;
            state.nextPositive = action.payload.next; 
        },

        NegativeArticleSlice: (state, action) => {
            state.NegativearticleData = action.payload;
            state.totalNegativeCount = action.payload.totalResults;
            state.nextNegative = action.payload.next; 
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
export const { ArticleSlice, NegativeArticleSlice,setLoading, setError } = authSlice.actions;
