import { configureStore } from "@reduxjs/toolkit";
import { stageIndReducer } from "./features/curInd/stageInd-slide";
import { stageDataReducer } from "./features/stageData/stageData-slide";
import { nextStepReducer } from "./features/nextStep/nextStep-slide";

export const store = configureStore({
    reducer: {
        stageInd: stageIndReducer,
        stageData: stageDataReducer,
        nextStep: nextStepReducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const getDataSelector = (state, index) => state.stageData[index]
export const getAllDataSelector = state => state.stageData