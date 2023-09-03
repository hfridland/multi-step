import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        name: '',
        email: '',
        phone: ''
    },
    {
        plan: 'arcade',
        billing: 'monthly'
    },
    {
        addOns: []
    }
]

const stageDataSlice = createSlice({
    name: '@@data',
    initialState,
    reducers: {
        setData: (stage, action) => { stage[action.payload.index] = action.payload.data }
    }
})

export const { setData } = stageDataSlice.actions
export const stageDataReducer = stageDataSlice.reducer

