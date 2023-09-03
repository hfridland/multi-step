import { createSlice } from "@reduxjs/toolkit";

const stageIndSlice = createSlice({
    name: '@@stageind',
    initialState: 0,
    reducers: {
        setStageInd: (_, action) => action.payload
    }
})

export const { setStageInd } = stageIndSlice.actions
export const stageIndReducer = stageIndSlice.reducer