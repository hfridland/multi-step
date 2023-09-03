import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nextStep: false
}

const nextStepSlice = createSlice({
    name: '@@nextStep',
    initialState,
    reducers: {
        setNextStep: (state, action) => { state.nextStep = action.payload }
    }
})

export const { setNextStep } = nextStepSlice.actions
export const nextStepReducer = nextStepSlice.reducer

