import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InterviewItem } from "../../../interface";

type InterviewState = { 
    InterviewItems: InterviewItem[] 
};

const initialState: InterviewState = { InterviewItems:[] };

export const InterviewSlice = createSlice({
    name: "interview",
    initialState,
    reducers: {
        addInterview: (state, action: PayloadAction<InterviewItem>) => {
            // Check if there's an existing interview for the same company on the same day
            const existingInterviewIndex = state.InterviewItems.findIndex(
                item => item.interviewDate === action.payload.interviewDate);
            if (existingInterviewIndex !== -1) {
                // Replace the existing interview with the new one
                state.InterviewItems[existingInterviewIndex] = action.payload;
            } else {
                // Add new interview if no existing interview found
                state.InterviewItems.push(action.payload);
            }
        },
        removeInterview: (state, action:PayloadAction<InterviewItem>) => {
            const remainItems = state.InterviewItems.filter(obj => {
                return ( (obj.user !== action.payload.user) && 
                (obj.company !== action.payload.company) && 
                (obj.interviewDate !== action.payload.interviewDate) && 
                (obj.createdAt !== action.payload.createdAt) )
            })
            state.InterviewItems = remainItems;
        },
    },
});

export const { addInterview: addInterview, removeInterview: removeInterview } = InterviewSlice.actions;
export default InterviewSlice.reducer;